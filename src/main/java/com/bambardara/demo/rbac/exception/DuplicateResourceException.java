package com.bambardara.demo.rbac.exception;

/**
 * A resource that must be unique (a role code, a role/module or
 * role/permission assignment) already exists. Results in HTTP 409 Conflict
 * (see GlobalExceptionHandler).
 */
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }
}
