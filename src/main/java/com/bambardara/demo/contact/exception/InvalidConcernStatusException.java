package com.bambardara.demo.contact.exception;

public class InvalidConcernStatusException extends RuntimeException {

    public InvalidConcernStatusException(String status) {

        super("Unknown concern status: " + status);
    }
}
