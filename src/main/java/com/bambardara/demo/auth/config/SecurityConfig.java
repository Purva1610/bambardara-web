package com.bambardara.demo.auth.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.DispatcherType;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Value("${app.cors.allowed-origins}")
    private List<String> allowedOrigins;

    // Kept for backward compatibility: any token issued by the legacy
    // POST /api/auth/login path (before the Keycloak migration) still
    // authenticates. Firebase authentication has been fully removed -
    // Keycloak is now the only external identity provider.
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // Keycloak migration: second and final fallback, tried only when the
    // legacy JWT filter did not already authenticate the request. See
    // KeycloakJwtProvisioningFilter's class Javadoc for why this is a plain
    // filter rather than Spring Security's oauth2ResourceServer() DSL.
    private final KeycloakJwtProvisioningFilter keycloakJwtProvisioningFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            KeycloakJwtProvisioningFilter keycloakJwtProvisioningFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.keycloakJwtProvisioningFilter = keycloakJwtProvisioningFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())

            // Nothing is kept server-side between requests; the bearer token is
            // the whole of the client's identity.
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .authorizeHttpRequests(auth -> auth
                // When a controller throws, Spring forwards to /error. Without
                // this the forward is treated as an unauthenticated request and
                // a genuine 500 comes back to the client as a 401.
                .dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()

                .requestMatchers(
                    "/api/auth/login",
                    "/api/auth/register",
                    "/api/auth/forgot-password",
                    "/api/auth/verify-otp",
                    "/api/auth/reset-password",
                    "/api/enquire"
                ).permitAll()

                // Swagger/OpenAPI UI and docs are read-only tooling, not application data
                .requestMatchers(
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/v3/api-docs/**",
                    "/v3/api-docs"
                ).permitAll()

                // Admin endpoints require ADMIN role - the local User.role
                // column, plus any realm_access.roles on a Keycloak token
                // (see KeycloakAuthorityMapper). Never derived from anything
                // the client sends directly.
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // CEO endpoints require the CEO realm role. CEO is a Keycloak
                // realm role only (see keycloak/realm-export/bambardara-realm.json)
                // - it is never assigned by POST /api/auth/register and has no
                // corresponding UserRole enum value, so a token can only carry
                // ROLE_CEO if an admin provisioned it directly in Keycloak.
                .requestMatchers("/api/ceo/**").hasRole("CEO")

                .anyRequest().authenticated()
            )

            // Without this the default is a redirect to a login page, which is
            // useless to a React client. Return a bare 401 instead.
            .exceptionHandling(handling -> handling
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
            )

            // Legacy JWT filter runs first (backward compatibility for tokens
            // issued by POST /api/auth/login before the Keycloak migration).
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            // Keycloak: tried last, only if the request is still
            // unauthenticated after the legacy JWT filter. No-ops entirely
            // until KEYCLOAK_ISSUER_URI is configured.
            .addFilterBefore(keycloakJwtProvisioningFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(allowedOrigins);
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);

        return source;
    }
}
