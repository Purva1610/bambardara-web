package com.bambardara.demo.auth.entity;

/**
 * Account status, independent of the {@link UserRole} enum and of the
 * Bambardara business role (see {@link com.bambardara.demo.rbac.entity.Role}).
 * A DISABLED user is rejected at authentication time regardless of role.
 */
public enum UserStatus {
    ACTIVE,
    DISABLED
}
