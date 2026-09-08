package com.bambardara.demo.auth.security;

import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

/**
 * Maps Keycloak JWT role claims to Spring Security {@link GrantedAuthority}
 * instances, kept isolated from the request-handling filter so the final
 * claim structure (a specific Keycloak client's roles under
 * {@code resource_access}, a custom claim mapper, etc.) can be adjusted here
 * without touching {@link com.bambardara.demo.auth.config.KeycloakJwtProvisioningFilter}.
 *
 * Phase 1 only reads the realm-level roles under {@code realm_access.roles} -
 * Keycloak's default location for roles assigned directly on the realm.
 * Client-scoped roles under {@code resource_access.<client>.roles} are not
 * read yet; add that here in a later phase if Bambardara's Keycloak client
 * ends up using client roles instead of (or in addition to) realm roles.
 *
 * This does not affect the legacy-JWT authorization path: it does not go
 * through this class, and {@code hasRole("ADMIN")} keeps working for it
 * exactly as before.
 */
public final class KeycloakAuthorityMapper {

    private static final String REALM_ACCESS_CLAIM = "realm_access";
    private static final String ROLES_CLAIM = "roles";

    private KeycloakAuthorityMapper() {
    }

    /**
     * @param jwt a validated Keycloak access token
     * @return one ROLE_&lt;UPPERCASE_ROLE_NAME&gt; authority per realm role
     *         present on the token; empty if the token carries none
     */
    public static Set<GrantedAuthority> mapRealmRoles(Jwt jwt) {

        Object realmAccess = jwt.getClaim(REALM_ACCESS_CLAIM);

        if (!(realmAccess instanceof Map<?, ?> realmAccessMap)) {
            return Set.of();
        }

        Object roles = realmAccessMap.get(ROLES_CLAIM);

        if (!(roles instanceof Collection<?> roleNames)) {
            return Set.of();
        }

        Set<GrantedAuthority> authorities = new LinkedHashSet<>();

        for (Object roleName : roleNames) {

            if (roleName instanceof String name && !name.isBlank()) {
                authorities.add(new SimpleGrantedAuthority("ROLE_" + name.toUpperCase(Locale.ROOT)));
            }
        }

        return authorities;
    }

    /**
     * Convenience overload for call sites that already have the roles as a
     * plain list (e.g. tests), without needing a full {@link Jwt}.
     */
    public static Set<GrantedAuthority> mapRealmRoleNames(List<String> roleNames) {

        Set<GrantedAuthority> authorities = new LinkedHashSet<>();

        for (String name : roleNames) {

            if (name != null && !name.isBlank()) {
                authorities.add(new SimpleGrantedAuthority("ROLE_" + name.toUpperCase(Locale.ROOT)));
            }
        }

        return authorities;
    }
}
