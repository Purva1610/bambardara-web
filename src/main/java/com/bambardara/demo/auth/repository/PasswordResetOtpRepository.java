package com.bambardara.demo.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bambardara.demo.auth.entity.PasswordResetOtp;

public interface PasswordResetOtpRepository extends JpaRepository<PasswordResetOtp, Long>{

    Optional<PasswordResetOtp> findTopByEmailOrderByIdDesc (String email);
    
}