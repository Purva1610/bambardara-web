package com.bambardara.demo.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.auth.dto.ForgotPasswordRequest;
import com.bambardara.demo.auth.dto.LoginRequest;
import com.bambardara.demo.auth.dto.LoginResponse;
import com.bambardara.demo.auth.dto.RegisterRequest;
import com.bambardara.demo.auth.dto.RegisterResponse;
import com.bambardara.demo.auth.dto.UserProfileResponse;
import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.auth.service.AuthService;
import com.bambardara.demo.auth.service.OtpService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;

    public AuthController(
            AuthService authService,
            OtpService otpService) {

        this.authService = authService;
        this.otpService = otpService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        RegisterResponse response = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        // An unregistered email surfaces as EmailNotFoundException, which
        // GlobalExceptionHandler turns into a 404.
        otpService.sendOtp(request.getEmail());

        return ResponseEntity.ok(
                "OTP sent successfully to your email"
        );
    }

    /**
     * Get current authenticated user profile.
     * 
     * Returns user information for the currently authenticated user.
     * Works with both Keycloak authentication and the legacy JWT path.
     * 
     * @param user injected by Spring Security from SecurityContext
     * @return user profile (id, name, email, role, etc.)
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
                user.getGender(),
                user.getRole()
        );

        return ResponseEntity.ok(response);
    }

}