package com.bambardara.demo.common.validation;

import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EnumValueValidator implements ConstraintValidator<EnumValue, CharSequence> {

    private Set<String> allowedNames;

    private boolean ignoreCase;

    private boolean generateMessage;

    @Override
    public void initialize(EnumValue annotation) {

        this.ignoreCase = annotation.ignoreCase();
        this.generateMessage = EnumValue.DEFAULT_MESSAGE.equals(annotation.message());

        // LinkedHashSet so a generated message lists the constants in
        // declaration order rather than an arbitrary one.
        this.allowedNames = Arrays.stream(annotation.enumClass().getEnumConstants())
                .map(Enum::name)
                .map(this::normalise)
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    @Override
    public boolean isValid(CharSequence value, ConstraintValidatorContext context) {

        if (value == null) {

            return true;
        }

        if (allowedNames.contains(normalise(value.toString()))) {

            return true;
        }

        if (generateMessage) {

            // Enum names cannot contain '{' or '$', so they are safe to splice
            // into a constraint template without escaping.
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "must be one of " + String.join(", ", allowedNames)
            ).addConstraintViolation();
        }

        return false;
    }

    private String normalise(String name) {

        return ignoreCase ? name.toUpperCase(Locale.ROOT) : name;
    }
}
