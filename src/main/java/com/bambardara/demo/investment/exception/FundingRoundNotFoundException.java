package com.bambardara.demo.investment.exception;

/**
 * Thrown when a referenced funding round does not exist.
 * HTTP Status: 404 Not Found.
 */
public class FundingRoundNotFoundException extends RuntimeException {

    public FundingRoundNotFoundException(String message) {
        super(message);
    }
}
