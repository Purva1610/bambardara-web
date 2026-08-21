package com.bambardara.demo.auth.service;

import com.bambardara.demo.auth.entity.User;

/**
 * Mints a credential for an authenticated user.
 *
 * Separate from {@link TokenVerifier} because the two have disjoint callers:
 * login issues and never verifies, the security filter verifies and never
 * issues. Neither is forced to depend on a method it cannot use, and a test can
 * stub one without also stubbing the other.
 */
public interface TokenIssuer {

    String issue(User user);

    /**
     * @return how long an issued token stays valid, in milliseconds. Exposed so
     *         the login response can tell the client when to re-authenticate.
     */
    long lifetimeMillis();
}
