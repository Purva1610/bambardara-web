package com.bambardara.demo.wellness.exception;

import com.bambardara.demo.wellness.entity.MassageCategory;
import com.bambardara.demo.wellness.entity.MassageType;

/**
 * Exception thrown when an invalid massage type is provided for a category.
 * Results in HTTP 400 Bad Request response.
 */
public class InvalidMassageTypeException extends IllegalArgumentException {

    public InvalidMassageTypeException(String message) {
        super(message);
    }

    public InvalidMassageTypeException(MassageType type, MassageCategory expectedCategory) {
        super(String.format("Invalid massage type %s for category %s. Expected category: %s",
                type, expectedCategory, type.getCategory()));
    }
}
