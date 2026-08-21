package com.bambardara.demo.auth.service;

import java.util.Optional;

/**
 * Establishes who, if anyone, a credential belongs to.
 *
 * @see TokenIssuer for why this is a separate interface.
 */
public interface TokenVerifier {

    /**
     * @return the identity the token was issued to, or empty if it is expired,
     *         tampered with, or otherwise unusable. Empty means "not logged
     *         in"; it is not an error the caller has to handle specially.
     */
    Optional<String> subjectOf(String token);
}
