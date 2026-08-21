package com.bambardara.demo.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bambardara.demo.auth.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>  {

    Optional<User> findByEmail(String email);


    
}