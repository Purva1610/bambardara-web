package com.bambardara.demo.auth.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.util.StringUtils;

/**
 * Builds the {@link JwtDecoder} used to validate Keycloak-issued access
 * tokens (signature, issuer, expiration - standard Spring Security OAuth2
 * JWT validation, no custom crypto).
 *
 * Deliberately NOT left to Spring Boot's own
 * {@code OAuth2ResourceServerAutoConfiguration} (excluded in
 * BambardaraBackendApplication): that autoconfiguration builds its
 * JwtDecoder eagerly as soon as
 * spring.security.oauth2.resourceserver.jwt.issuer-uri is present at all,
 * including the blank default this project ships until Keycloak is actually
 * deployed, which would fail application startup. This bean instead returns
 * null when the property is blank, so {@link KeycloakJwtProvisioningFilter}
 * (which receives it via optional injection) simply does nothing until a
 * real issuer is configured.
 */
@Configuration
public class KeycloakResourceServerConfig {

    private static final Logger logger = LoggerFactory.getLogger(KeycloakResourceServerConfig.class);

    @Bean
    public JwtDecoder keycloakJwtDecoder(
            @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri:}") String issuerUri) {

        if (!StringUtils.hasText(issuerUri)) {
            logger.info("KEYCLOAK_ISSUER_URI not configured - Keycloak JWT validation is disabled");
            return null;
        }

        logger.info("Configuring Keycloak JWT validation against issuer: {}", issuerUri);
        return JwtDecoders.fromIssuerLocation(issuerUri);
    }
}
