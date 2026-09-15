package com.bambardara.demo.rbac.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.rbac.dto.MeAccessResponse;
import com.bambardara.demo.rbac.service.AuthorizationService;

/**
 * GET /api/me/access - the currently authenticated user's Bambardara
 * authorization (business role, enabled modules, granted permissions).
 * Consumed by the React frontend to build the sidebar/dashboard dynamically.
 * Requires authentication only (see SecurityConfig's anyRequest().authenticated()) -
 * every signed-in user, regardless of role, can read their own access.
 */
@RestController
@RequestMapping("/api/me")
public class MeAccessController {

    private final AuthorizationService authorizationService;

    public MeAccessController(AuthorizationService authorizationService) {
        this.authorizationService = authorizationService;
    }

    @GetMapping("/access")
    public ResponseEntity<MeAccessResponse> getMyAccess(@AuthenticationPrincipal User user) {

        String roleCode = user.getBusinessRole() != null ? user.getBusinessRole().getCode() : null;

        MeAccessResponse.UserInfo userInfo = new MeAccessResponse.UserInfo(
                user.getId(),
                user.getName(),
                user.getEmail(),
                roleCode);

        MeAccessResponse response = new MeAccessResponse(
                userInfo,
                authorizationService.getEnabledModuleCodes(user),
                authorizationService.getPermissionCodes(user));

        return ResponseEntity.ok(response);
    }
}
