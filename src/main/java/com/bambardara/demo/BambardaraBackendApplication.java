package com.bambardara.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.resource.servlet.OAuth2ResourceServerAutoConfiguration;

/**
 * OAuth2ResourceServerAutoConfiguration is excluded because it eagerly builds
 * a JwtDecoder from spring.security.oauth2.resourceserver.jwt.issuer-uri as
 * soon as that property is present at all - including the blank default this
 * project ships until Keycloak is actually deployed - which would fail
 * application startup. KeycloakResourceServerConfig reads the same property
 * itself and only builds a decoder once it is non-blank.
 */
@SpringBootApplication(exclude = OAuth2ResourceServerAutoConfiguration.class)
public class BambardaraBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BambardaraBackendApplication.class, args);
	}

}
