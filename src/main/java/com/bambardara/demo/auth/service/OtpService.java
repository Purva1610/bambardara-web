package com.bambardara.demo.auth.service;

import java.time.LocalDateTime;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.stereotype.Service;

import com.bambardara.demo.auth.entity.PasswordResetOtp;
import com.bambardara.demo.auth.exception.EmailNotFoundException;
import com.bambardara.demo.auth.repository.PasswordResetOtpRepository;
import com.bambardara.demo.auth.repository.UserRepository;

@Service
public class OtpService {

    private final UserRepository repository;
    private final PasswordResetOtpRepository otpRepository;
    private final EmailService emailService;

    public OtpService(
            UserRepository repository,
            PasswordResetOtpRepository otpRepository,
            EmailService emailService) {

        this.repository = repository;
        this.otpRepository = otpRepository;
        this.emailService = emailService;
    }

    public void sendOtp(String email) {

        // Check whether the user exists
        repository.findByEmail(email)
                .orElseThrow(EmailNotFoundException::new);

        // Generate a 6-digit OTP
        String otp = String.valueOf(
                ThreadLocalRandom.current()
                        .nextInt(100000, 1000000)
        );

        // OTP expires after 5 minutes
        LocalDateTime expiryTime =
                LocalDateTime.now().plusMinutes(5);

        // Save OTP
        PasswordResetOtp passwordResetOtp =
                new PasswordResetOtp(
                        email,
                        otp,
                        expiryTime
                );

        otpRepository.save(passwordResetOtp);

        // Send OTP through email
        emailService.sendOtp(email, otp);
    }
}