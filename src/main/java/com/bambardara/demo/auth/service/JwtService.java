package com.bambardara.demo.auth.service;

import java.util.Date;
import java.util.Optional;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bambardara.demo.auth.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

/**
 * JWT-backed implementation of the token contracts.
 *
 * Callers depend on {@link TokenIssuer} / {@link TokenVerifier} rather than on
 * this class, so replacing JWTs with opaque tokens or a session store is a
 * matter of adding another implementation.
 */
@Service
public class JwtService implements TokenIssuer, TokenVerifier {

    private final SecretKey signingKey;

    private final long expiryMillis;

    public JwtService(
            @Value("${app.jwt.secret}") String base64Secret,
            @Value("${app.jwt.expiry-minutes}") long expiryMinutes) {

        // HS256 needs at least 256 bits of key material; a short secret makes
        // Keys.hmacShaKeyFor throw at startup rather than silently weakening
        // every token we sign.
        this.signingKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(base64Secret));
        this.expiryMillis = expiryMinutes * 60 * 1000;
    }

    @Override
    public String issue(User user) {

        Date now = new Date();

        return Jwts.builder()
                .subject(user.getEmail())
                .claim("userId", user.getId())
                .claim("name", user.getName())
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expiryMillis))
                .signWith(signingKey)
                .compact();
    }

    @Override
    public long lifetimeMillis() {

        return expiryMillis;
    }

    @Override
    public Optional<String> subjectOf(String token) {

        try {

            Claims claims = Jwts.parser()
                    .verifyWith(signingKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            return Optional.ofNullable(claims.getSubject());

        } catch (JwtException | IllegalArgumentException e) {

            return Optional.empty();
        }
    }
}
