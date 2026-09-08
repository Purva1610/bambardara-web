package com.bambardara.demo.auth.config;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.bambardara.demo.auth.repository.UserRepository;
import com.bambardara.demo.auth.service.TokenVerifier;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Reads the "Authorization: Bearer &lt;token&gt;" header and, when the token
 * checks out, puts the matching User into the SecurityContext so controllers
 * can pick it up with {@code @AuthenticationPrincipal}.
 *
 * Depends on {@link TokenVerifier} rather than on JwtService: this filter's job
 * is turning a credential into a SecurityContext entry, and it has no stake in
 * what format the credential is.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String BEARER_PREFIX = "Bearer ";

    private final TokenVerifier tokenVerifier;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(
            TokenVerifier tokenVerifier,
            UserRepository userRepository) {

        this.tokenVerifier = tokenVerifier;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        // No token is not an error here. The request continues unauthenticated
        // and the authorization rules decide whether that is allowed.
        if (header == null || !header.startsWith(BEARER_PREFIX)) {

            filterChain.doFilter(request, response);
            return;
        }

        if (SecurityContextHolder.getContext().getAuthentication() == null) {

            tokenVerifier.subjectOf(header.substring(BEARER_PREFIX.length()))

                    // Load the user on every request rather than trusting the
                    // claims: an account deleted after the token was issued
                    // must stop working immediately.
                    .flatMap(userRepository::findByEmail)

                    .ifPresent(user -> {

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        user,
                                        null,
                                        List.<GrantedAuthority>of()
                                );

                        authentication.setDetails(
                                new WebAuthenticationDetailsSource().buildDetails(request)
                        );

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    });
        }

        filterChain.doFilter(request, response);
    }
}
