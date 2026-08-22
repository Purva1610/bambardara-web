package com.bambardara.demo.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bambardara.demo.auth.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>  {

    Optional<User> findByEmail(String email);

    /**
     * Find user by Firebase UID.
     * Primary authentication identifier after Firebase migration.
     */
    Optional<User> findByFirebaseUid(String firebaseUid);

    /**
     * @deprecated Replaced by findByFirebaseUid
     */
    @Deprecated
    Optional<User> findByGoogleId(String googleId);

    
}