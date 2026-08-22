package com.bambardara.demo.auth.entity;

/**
 * User roles for authorization.
 * 
 * USER: Regular authenticated user
 * - Can access their own profile
 * - Can submit contact forms
 * - Can view their own submissions
 * 
 * ADMIN: Administrative user
 * - All USER permissions
 * - Can access /api/admin/** endpoints
 * - Can view all users and contact submissions
 * 
 * Role Assignment:
 * - Roles are set via Firebase custom claims
 * - Cannot be set by the client/frontend
 * - Use Firebase Admin SDK to assign: setCustomUserClaims(uid, {admin: true})
 */
public enum UserRole {
    USER,
    ADMIN
}
