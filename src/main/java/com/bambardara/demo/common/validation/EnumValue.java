package com.bambardara.demo.common.validation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

/**
 * Checks that a String field holds the name of a constant of {@code enumClass}.
 *
 * Replaces hand-written {@code @Pattern(regexp = "A|B|C")} alternations. Those
 * have to be edited every time a constant is added, which makes the enum closed
 * to extension; this derives the allowed set from the enum itself, so adding a
 * constant needs no change here or at the call site.
 *
 * Null passes: "required" belongs to {@code @NotBlank}, not to this constraint.
 */
@Documented
@Constraint(validatedBy = EnumValueValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface EnumValue {

    /**
     * Sentinel telling the validator to generate a message listing the allowed
     * constants. Any other value is used verbatim, for fields where the client
     * shows the message to a person.
     */
    String DEFAULT_MESSAGE = "must be one of the allowed values";

    Class<? extends Enum<?>> enumClass();

    String message() default DEFAULT_MESSAGE;

    boolean ignoreCase() default false;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
