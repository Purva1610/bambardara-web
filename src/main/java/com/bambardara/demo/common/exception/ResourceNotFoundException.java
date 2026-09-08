package com.bambardara.demo.common.exception;

/**
 * Base exception for resource not found errors.
 * Results in HTTP 404 Not Found response.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String resourceName, Integer id) {
        super(String.format("%s not found with id: %d", resourceName, id));
    }
}
