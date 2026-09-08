package com.bambardara.demo.auth.exception;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bambardara.demo.adventure.exception.InsufficientCapacityException;
import com.bambardara.demo.adventure.exception.SlotNotAvailableException;
import com.bambardara.demo.auth.dto.ApiError;
import com.bambardara.demo.common.exception.ResourceNotFoundException;
import com.bambardara.demo.membership.exception.InvalidMembershipStatusTransitionException;
import com.bambardara.demo.membership.exception.MembershipNotFoundException;
import com.bambardara.demo.membership.exception.MembershipPlanNotFoundException;
import com.bambardara.demo.membership.exception.PlanNotActiveException;
import com.bambardara.demo.stay.exception.AccommodationNotAvailableException;
import com.bambardara.demo.wellness.exception.SpaSlotNotAvailableException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailNotFoundException.class)
    public ResponseEntity<ApiError> handleEmailNotFound(EmailNotFoundException e) {

        return build(HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ApiError> handleInvalidCredentials(InvalidCredentialsException e) {

        return build(HttpStatus.UNAUTHORIZED, e.getMessage());
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ApiError> handleEmailAlreadyExists(EmailAlreadyExistsException e) {

        return build(HttpStatus.CONFLICT, e.getMessage());
    }

    @ExceptionHandler(KeycloakProvisioningException.class)
    public ResponseEntity<ApiError> handleKeycloakProvisioning(KeycloakProvisioningException e) {

        return build(HttpStatus.BAD_GATEWAY, e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException e) {

        Map<String, String> fieldErrors = new LinkedHashMap<>();

        for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {

            // Keep the first message per field so the response stays predictable.
            fieldErrors.putIfAbsent(
                    fieldError.getField(),
                    fieldError.getDefaultMessage()
            );
        }

        ApiError body = new ApiError(
                HttpStatus.BAD_REQUEST.value(),
                "Validation failed",
                fieldErrors
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    // =============================================================================
    // General Resource Exception Handlers
    // =============================================================================

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleResourceNotFound(RuntimeException e) {
        return build(HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiError> handleAccessDenied(AccessDeniedException e) {
        return build(HttpStatus.FORBIDDEN, "Access denied: " + e.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> handleIllegalArgument(IllegalArgumentException e) {
        return build(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ApiError> handleIllegalState(IllegalStateException e) {
        return build(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    // =============================================================================
    // Stay & Hospitality Exception Handlers
    // =============================================================================

    @ExceptionHandler(AccommodationNotAvailableException.class)
    public ResponseEntity<ApiError> handleAccommodationNotAvailable(AccommodationNotAvailableException e) {
        return build(HttpStatus.CONFLICT, e.getMessage());
    }

    @ExceptionHandler(SpaSlotNotAvailableException.class)
    public ResponseEntity<ApiError> handleSpaSlotNotAvailable(SpaSlotNotAvailableException e) {
        return build(HttpStatus.CONFLICT, e.getMessage());
    }

    @ExceptionHandler(InsufficientCapacityException.class)
    public ResponseEntity<ApiError> handleInsufficientCapacity(InsufficientCapacityException e) {
        return build(HttpStatus.CONFLICT, e.getMessage());
    }

    @ExceptionHandler(SlotNotAvailableException.class)
    public ResponseEntity<ApiError> handleSlotNotAvailable(SlotNotAvailableException e) {
        return build(HttpStatus.CONFLICT, e.getMessage());
    }

    // =============================================================================
    // Membership Exception Handlers
    // =============================================================================

    @ExceptionHandler(MembershipPlanNotFoundException.class)
    public ResponseEntity<ApiError> handleMembershipPlanNotFound(MembershipPlanNotFoundException e) {
        return build(HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(MembershipNotFoundException.class)
    public ResponseEntity<ApiError> handleMembershipNotFound(MembershipNotFoundException e) {
        return build(HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(PlanNotActiveException.class)
    public ResponseEntity<ApiError> handlePlanNotActive(PlanNotActiveException e) {
        return build(HttpStatus.CONFLICT, e.getMessage());
    }

    @ExceptionHandler(InvalidMembershipStatusTransitionException.class)
    public ResponseEntity<ApiError> handleInvalidMembershipStatusTransition(InvalidMembershipStatusTransitionException e) {
        return build(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    // =============================================================================
    // Generic Exception Handlers
    // =============================================================================

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<ApiError> handleSecurityException(SecurityException e) {
        return build(HttpStatus.FORBIDDEN, e.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiError> handleRuntimeException(RuntimeException e) {
        // Log the exception but don't expose internal details to client
        return build(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred: " + e.getMessage());
    }

    private ResponseEntity<ApiError> build(HttpStatus status, String message) {

        return ResponseEntity
                .status(status)
                .body(new ApiError(status.value(), message));
    }
}
