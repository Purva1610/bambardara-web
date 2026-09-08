package com.bambardara.demo.adventure.exception;

import com.bambardara.demo.common.exception.ResourceNotFoundException;

/**
 * Exception thrown when an adventure activity is not found.
 * Results in HTTP 404 Not Found response.
 */
public class AdventureActivityNotFoundException extends ResourceNotFoundException {

    public AdventureActivityNotFoundException(Integer id) {
        super("Adventure activity", id);
    }

    public AdventureActivityNotFoundException(String message) {
        super(message);
    }
}
