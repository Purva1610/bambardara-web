package com.bambardara.demo.investment.exception;

/**
 * Thrown when a referenced investor does not exist.
 * HTTP Status: 404 Not Found.
 */
public class InvestorNotFoundException extends RuntimeException {

    public InvestorNotFoundException(String message) {
        super(message);
    }
}
