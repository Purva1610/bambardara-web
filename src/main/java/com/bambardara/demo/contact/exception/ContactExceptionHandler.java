package com.bambardara.demo.contact.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bambardara.demo.common.dto.ApiError;

/**
 * Error handling for the contact module.
 *
 * Its own advice rather than another method on the auth module's handler:
 * Spring applies every {@code @RestControllerAdvice} in the context, so a new
 * feature can report its own failures without anyone editing a shared class.
 */
@RestControllerAdvice
public class ContactExceptionHandler {

    @ExceptionHandler(InvalidConcernStatusException.class)
    public ResponseEntity<ApiError> handleInvalidConcernStatus(InvalidConcernStatusException e) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ApiError(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
    }
}
