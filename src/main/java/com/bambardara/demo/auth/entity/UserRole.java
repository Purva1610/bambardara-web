package com.bambardara.demo.auth.entity;

/**
 * User roles for authorization.
 *
 * Stored locally on the User entity (never elevated automatically from a
 * client or identity token - see KeycloakUserProvisioningService); a
 * privileged role is always a separate, deliberate administrative action.
 *
 * Spring Security uses these roles for authorization:
 * - @PreAuthorize("hasRole('ADMIN')")
 * - @PreAuthorize("hasRole('USER')")
 * 
 * Role hierarchy (if needed later):
 * - ADMIN can do everything USER can do
 * - MARKETING can access marketing-specific features
 */
public enum UserRole {
    /**
     * Regular user - default role for all users.
     * Can access their own data, create bookings, submit contact forms.
     */
    USER,
    
    /**
     * Administrator - full access to admin endpoints.
     * Can manage users, bookings, content, and view all data.
     */
    ADMIN,
    
    /**
     * Marketing team member - future role for marketing features.
     * Can view and manage contact form submissions, analytics.
     */
    MARKETING
}
