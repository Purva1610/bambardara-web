package com.bambardara.demo.auth.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bambardara.demo.auth.dto.LoginRequest;
import com.bambardara.demo.auth.dto.LoginResponse;
import com.bambardara.demo.auth.dto.RegisterRequest;
import com.bambardara.demo.auth.dto.RegisterResponse;
import com.bambardara.demo.auth.entity.Gender;
import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.auth.exception.EmailAlreadyExistsException;
import com.bambardara.demo.auth.exception.EmailNotFoundException;
import com.bambardara.demo.auth.exception.InvalidCredentialsException;
import com.bambardara.demo.auth.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    // The abstraction, not JwtService: logging in cares that a credential is
    // produced, not that it happens to be a JWT.
    private final TokenIssuer tokenIssuer;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            TokenIssuer tokenIssuer) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenIssuer = tokenIssuer;

    }

    public RegisterResponse register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {

            throw new EmailAlreadyExistsException();

        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                request.getMobileNumber(),
                request.getAddress(),
                Gender.valueOf(request.getGender()),
                passwordEncoder.encode(request.getPassword())
        );

        User saved;

        try {

            saved = userRepository.saveAndFlush(user);

        } catch (DataIntegrityViolationException e) {

            // Two concurrent signups can both pass the check above; the unique
            // constraint on email is what actually decides the winner.
            throw new EmailAlreadyExistsException();

        }

        return new RegisterResponse(
                "Registration successful",
                saved.getId(),
                saved.getName(),
                saved.getEmail()
        );

    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(EmailNotFoundException::new);

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {

            throw new InvalidCredentialsException();

        }

        return new LoginResponse(
                "Login successful",
                user.getId(),
                user.getName(),
                user.getEmail(),
                tokenIssuer.issue(user),
                tokenIssuer.lifetimeMillis()
            );

    }


}
