package com.bambardara.demo.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.auth.entity.User;

/**
 * Authentication endpoints for Firebase-authenticated users.
 * 
 * After Firebase migration:
 * - Login/signup/password reset are handled by Firebase on the frontend
 * - No backend authentication endpoints are needed for these operations
 * - This controller provides utility endpoints for authenticated users
 * 
 * REMOVED endpoints (now handled by Firebase client SDK):
 * - POST /api/auth/register → Use Firebase createUserWithEmailAndPassword()
 * - POST /api/auth/login → Use Firebase signInWithEmailAndPassword()
 * - POST /api/auth/forgot-password → Use Firebase sendPasswordResetEmail()
 * - POST /api/auth/oauth/exchange → Use Firebase signInWithPopup()
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    /**
     * Get the currently authenticated user's information.
     * 
     * This endpoint can be used by the frontend to:
     * - Verify the Firebase token is valid
     * - Retrieve the user's PostgreSQL profile
     * - Get application-specific user data
     * 
     * @param user the authenticated user (from Firebase token)
     * @return user information
     */
    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getCurrentUser(
            @AuthenticationPrincipal User user) {

        UserProfileResponse response = new UserProfileResponse(
                user.getId(),
                user.getFirebaseUid(),
                user.getName(),
                user.getEmail(),
                user.getMobileNumber(),
                user.getAddress(),
                user.getGender().name(),
                user.getRole().name()
        );

        return ResponseEntity.ok(response);
    }

    /**
     * User profile response DTO
     */
    public record UserProfileResponse(
            Integer id,
            String firebaseUid,
            String name,
            String email,
            String mobileNumber,
            String address,
            String gender,
            String role
    ) {
    }
}
