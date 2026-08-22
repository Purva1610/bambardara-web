package com.bambardara.demo.auth.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.auth.entity.UserRole;
import com.bambardara.demo.auth.repository.UserRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Firebase Authentication Filter.
 * 
 * Reads the "Authorization: Bearer <Firebase-ID-Token>" header and verifies
 * the token using Firebase Admin SDK. When the token is valid:
 * 
 * 1. Extracts Firebase UID, email, and name from the verified token
 * 2. Extracts role from Firebase custom claims (admin: true/false)
 * 3. Finds or creates the corresponding PostgreSQL User
 * 4. Sets the User and authorities in Spring Security context
 * 
 * Authentication flow:
 * - React frontend authenticates with Firebase (email/password or Google)
 * - Firebase returns an ID token to the frontend
 * - Frontend sends: Authorization: Bearer <Firebase-ID-Token>
 * - This filter verifies the token and loads/creates the User
 * 
 * Authorization flow:
 * - Admin role is set via Firebase custom claims: {admin: true}
 * - Use Firebase Admin SDK to set custom claims (cannot be set by client)
 * - Example: admin.auth().setCustomUserClaims(uid, {admin: true})
 * - Role is extracted from token and used for Spring Security authorization
 * 
 * Security:
 * - Firebase ID tokens are verified cryptographically by Firebase Admin SDK
 * - Custom claims are signed by Firebase and cannot be forged by the client
 * - Never trust the frontend to send user ID/email/role directly
 * - Always extract identity and role from the verified token
 */
@Component
public class FirebaseAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(FirebaseAuthenticationFilter.class);

    private static final String BEARER_PREFIX = "Bearer ";

    private final UserRepository userRepository;

    public FirebaseAuthenticationFilter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        // No token is not an error. The request continues unauthenticated
        // and Spring Security authorization rules decide if that's allowed.
        if (header == null || !header.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Skip if already authenticated (shouldn't happen, but defensive)
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        String firebaseToken = header.substring(BEARER_PREFIX.length());

        try {

            // Verify Firebase ID token using Firebase Admin SDK
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(firebaseToken);

            // Extract Firebase UID (stable identifier across all auth providers)
            String firebaseUid = decodedToken.getUid();

            // Extract user information from verified token claims
            String email = decodedToken.getEmail();
            String name = decodedToken.getName();

            // Extract admin role from Firebase custom claims
            // Custom claim: {admin: true} → ROLE_ADMIN
            // Custom claim: {admin: false} or missing → ROLE_USER
            boolean isAdmin = false;
            Object adminClaim = decodedToken.getClaims().get("admin");
            if (adminClaim instanceof Boolean) {
                isAdmin = (Boolean) adminClaim;
            }

            // Load or create PostgreSQL user
            User user = findOrCreateUser(firebaseUid, email, name, isAdmin);

            // Build Spring Security authorities from user role
            List<GrantedAuthority> authorities = buildAuthorities(user.getRole());

            // Set authenticated user in Spring Security context
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            user,
                            null,
                            authorities
                    );

            authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            logger.debug("Firebase authentication successful for user: {}", email);

        } catch (FirebaseAuthException e) {

            // Invalid, expired, or revoked token
            // Don't set authentication - request continues as unauthenticated
            logger.warn("Firebase token verification failed: {}", e.getMessage());

        } catch (Exception e) {

            // Unexpected error during authentication
            logger.error("Error during Firebase authentication", e);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Find existing user by Firebase UID, or create a new user.
     * 
     * This ensures that:
     * - Firebase UID is the primary identifier (works across email/Google/etc.)
     * - Users are automatically created on first login
     * - No duplicate users are created for the same Firebase UID
     * - Role is set from Firebase custom claims on first login
     * 
     * @param firebaseUid Firebase UID from verified token (never null)
     * @param email User email from verified token (may be null for some providers)
     * @param name User display name from verified token (may be null)
     * @param isAdmin Whether user has admin custom claim in Firebase
     * @return User entity (existing or newly created)
     */
    private User findOrCreateUser(String firebaseUid, String email, String name, boolean isAdmin) {

        // Try to find existing user by Firebase UID
        return userRepository.findByFirebaseUid(firebaseUid)
                .map(existingUser -> {
                    // Update role if it changed in Firebase
                    UserRole expectedRole = isAdmin ? UserRole.ADMIN : UserRole.USER;
                    if (existingUser.getRole() != expectedRole) {
                        logger.info("Updating role for user {}: {} -> {}", 
                            firebaseUid, existingUser.getRole(), expectedRole);
                        existingUser.setRole(expectedRole);
                        return userRepository.saveAndFlush(existingUser);
                    }
                    return existingUser;
                })
                .orElseGet(() -> {

                    // User doesn't exist - create new user
                    logger.info("Creating new user for Firebase UID: {} (admin: {})", firebaseUid, isAdmin);

                    // Use email as name fallback if name is not provided
                    String displayName = (name != null && !name.trim().isEmpty())
                            ? name
                            : (email != null ? email.split("@")[0] : "User");

                    // Use a placeholder email if not provided (rare, but possible)
                    String userEmail = (email != null && !email.trim().isEmpty())
                            ? email
                            : firebaseUid + "@firebase.local";

                    User newUser = new User(firebaseUid, displayName, userEmail);
                    
                    // Set role from Firebase custom claims
                    newUser.setRole(isAdmin ? UserRole.ADMIN : UserRole.USER);

                    try {
                        return userRepository.saveAndFlush(newUser);
                    } catch (DataIntegrityViolationException e) {
                        // Race condition: another thread created the user simultaneously
                        // Try to fetch the user that was just created
                        return userRepository.findByFirebaseUid(firebaseUid)
                                .orElseThrow(() -> new IllegalStateException(
                                        "Failed to create or find user for Firebase UID: " + firebaseUid
                                ));
                    }
                });
    }

    /**
     * Build Spring Security authorities from user role.
     * 
     * Converts UserRole enum to GrantedAuthority objects that Spring Security
     * uses for authorization checks (e.g., hasRole("ADMIN")).
     * 
     * Note: Spring Security automatically adds "ROLE_" prefix, so:
     * - UserRole.ADMIN → SimpleGrantedAuthority("ROLE_ADMIN")
     * - hasRole("ADMIN") checks for "ROLE_ADMIN" authority
     * 
     * @param role User's role from database
     * @return List of authorities for Spring Security
     */
    private List<GrantedAuthority> buildAuthorities(UserRole role) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        
        // Add role-based authority
        // Spring Security's hasRole() expects "ROLE_" prefix
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));
        
        return authorities;
    }
}
