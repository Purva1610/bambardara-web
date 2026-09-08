package com.bambardara.demo.auth.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.auth.entity.UserRole;
import com.bambardara.demo.auth.security.KeycloakAuthorityMapper;
import com.bambardara.demo.auth.service.KeycloakUserProvisioningService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Bridges a Keycloak-issued access token to the existing
 * {@code @AuthenticationPrincipal User} principal architecture, so none of
 * the ~10 controllers using that annotation need to change.
 *
 * This runs as a plain servlet filter - not Spring Security's declarative
 * {@code oauth2ResourceServer().jwt()} DSL - added as a second, final
 * fallback after {@link JwtAuthenticationFilter} in {@link SecurityConfig}.
 * That is a deliberate choice: the declarative DSL registers its own
 * BearerTokenAuthenticationFilter, which attempts to authenticate *every*
 * bearer token unconditionally and throws (triggering a 401 via
 * ExceptionTranslationFilter) on any token it cannot validate - which would
 * include every still-valid legacy JWT, breaking existing authentication.
 * Running as one more filter in the existing try-each-mechanism chain avoids
 * that: if the legacy JWT filter already authenticated the request, this
 * filter no-ops; if not, it attempts Keycloak validation and quietly falls
 * through on failure.
 *
 * JWT signature, issuer, and expiry validation is delegated entirely to the
 * standard Spring Security {@link JwtDecoder} (see
 * {@link KeycloakResourceServerConfig}) - no custom cryptography here.
 */
@Component
public class KeycloakJwtProvisioningFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(KeycloakJwtProvisioningFilter.class);

    private static final String BEARER_PREFIX = "Bearer ";

    private final JwtDecoder keycloakJwtDecoder;
    private final KeycloakUserProvisioningService provisioningService;

    /**
     * @param keycloakJwtDecoderProvider resolves to no bean when
     *                                   KEYCLOAK_ISSUER_URI is not configured
     *                                   (see KeycloakResourceServerConfig,
     *                                   which then returns null rather than
     *                                   registering a decoder) - this filter
     *                                   then no-ops on every request. An
     *                                   ObjectProvider, rather than a plain
     *                                   JwtDecoder constructor parameter, is
     *                                   what actually makes this dependency
     *                                   optional to Spring's container.
     * @param provisioningService        finds or creates the local User for
     *                                   a validated token's subject
     */
    public KeycloakJwtProvisioningFilter(
            ObjectProvider<JwtDecoder> keycloakJwtDecoderProvider,
            KeycloakUserProvisioningService provisioningService) {

        this.keycloakJwtDecoder = keycloakJwtDecoderProvider.getIfAvailable();
        this.provisioningService = provisioningService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        // Keycloak not configured yet in this environment - defer entirely
        // to the legacy JWT filter.
        if (keycloakJwtDecoder == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        // The legacy JWT filter already authenticated this request - do not
        // attempt to re-authenticate or overwrite it.
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(BEARER_PREFIX.length());

        try {

            Jwt jwt = keycloakJwtDecoder.decode(token);

            String subject = jwt.getSubject();
            String email = jwt.getClaimAsString("email");
            String name = firstNonBlank(
                    jwt.getClaimAsString("name"),
                    jwt.getClaimAsString("preferred_username"),
                    joinGivenFamilyName(jwt));

            User user = provisioningService.findOrProvisionUser(subject, email, name);

            List<GrantedAuthority> authorities = buildAuthorities(user, jwt);

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(user, null, authorities);

            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            logger.debug("Keycloak authentication successful for subject: {}", subject);

        } catch (JwtException e) {

            // Not a valid Keycloak token (wrong issuer/signature, expired,
            // malformed - or simply a legacy JWT that reached this filter
            // because the earlier filter didn't match it). Continue
            // unauthenticated rather than rejecting the request;
            // downstream authorization rules decide if that's
            // allowed.
            logger.debug("Keycloak token verification did not succeed: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Local DB role plus any realm roles present on the token, so an
     * existing local ADMIN keeps working and a Keycloak-side realm role can
     * also grant authorities without waiting for a later phase.
     */
    private List<GrantedAuthority> buildAuthorities(User user, Jwt jwt) {

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
        authorities.addAll(KeycloakAuthorityMapper.mapRealmRoles(jwt));
        return authorities;
    }

    private static String joinGivenFamilyName(Jwt jwt) {

        String given = jwt.getClaimAsString("given_name");
        String family = jwt.getClaimAsString("family_name");

        if (given == null && family == null) {
            return null;
        }

        return ((given != null ? given : "") + " " + (family != null ? family : "")).trim();
    }

    private static String firstNonBlank(String... values) {

        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }

        return null;
    }
}
