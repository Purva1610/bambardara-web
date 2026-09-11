package com.bambardara.demo.ceo.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Verifies the CEO authentication/authorization foundation in isolation,
 * before any real CEO dashboard endpoint exists. Reachable only with a
 * Keycloak-issued token carrying the CEO realm role (see
 * keycloak/realm-export/bambardara-realm.json) - {@code hasRole("CEO")} is
 * enforced both here and, redundantly, in SecurityConfig's URL matcher for
 * {@code /api/ceo/**}, matching the existing ADMIN convention.
 *
 * Intentionally contains no dashboard/business logic - replace or remove
 * once real CEO endpoints exist.
 */
@RestController
@RequestMapping("/api/ceo")
@PreAuthorize("hasRole('CEO')")
public class CeoAuthTestController {

    @GetMapping("/auth-test")
    public ResponseEntity<Map<String, Object>> authTest() {

        return ResponseEntity.ok(Map.of(
                "authenticated", true,
                "role", "CEO"
        ));
    }
}
