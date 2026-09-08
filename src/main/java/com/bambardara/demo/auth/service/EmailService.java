package com.bambardara.demo.auth.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtp(String email, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        // Sender
        message.setFrom("abhayepay@gmail.com");

        // Receiver
        message.setTo(email);

        // Subject
        message.setSubject("Bambardara - Password Reset OTP");

        // Email body
        message.setText(
                "Your password reset OTP is: " + otp +
                "\n\nThis OTP will expire in 5 minutes." +
                "\n\nIf you did not request a password reset, please ignore this email."
        );

        mailSender.send(message);
    }
}