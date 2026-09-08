package com.bambardara.demo.admin.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.admin.dto.AdminUserDetailResponse;
import com.bambardara.demo.admin.dto.AdminUserResponse;
import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.auth.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for admin user management operations.
 * 
 * Provides user listing, search, and detail viewing capabilities.
 * Does NOT expose sensitive information like passwords.
 */
@Service
public class AdminUserService {

    private final UserRepository userRepository;

    public AdminUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Get paginated list of all users.
     * 
     * @param pageable pagination parameters
     * @return page of users
     */
    @Transactional(readOnly = true)
    public Page<AdminUserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(this::mapToUserResponse);
    }

    /**
     * Get paginated list of users filtered by search term.
     * Searches in name and email fields.
     * 
     * @param search search term
     * @param pageable pagination parameters
     * @return page of matching users
     */
    @Transactional(readOnly = true)
    public Page<AdminUserResponse> searchUsers(String search, Pageable pageable) {
        // Get all users and filter in memory (simple implementation)
        // For production, consider implementing custom repository method with SQL LIKE
        Page<User> allUsers = userRepository.findAll(pageable);
        
        String searchLower = search.toLowerCase();
        
        // Filter and convert to response
        List<AdminUserResponse> filtered = allUsers.getContent().stream()
                .filter(user -> 
                    user.getName().toLowerCase().contains(searchLower) ||
                    user.getEmail().toLowerCase().contains(searchLower)
                )
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
        
        return new PageImpl<>(filtered, pageable, filtered.size());
    }

    /**
     * Get detailed information about a specific user.
     * 
     * @param userId user ID
     * @return user details
     * @throws RuntimeException if user not found
     */
    @Transactional(readOnly = true)
    public AdminUserDetailResponse getUserById(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        return mapToUserDetailResponse(user);
    }

    /**
     * Map User entity to summary response (for list view).
     */
    private AdminUserResponse mapToUserResponse(User user) {
        return new AdminUserResponse(
                user.getId(),
                user.getFirebaseUid(),
                user.getName(),
                user.getEmail(),
                user.getMobileNumber(),
                user.getRole(),
                user.getGender()
        );
    }

    /**
     * Map User entity to detailed response (for single view).
     */
    private AdminUserDetailResponse mapToUserDetailResponse(User user) {
        return new AdminUserDetailResponse(
                user.getId(),
                user.getFirebaseUid(),
                user.getName(),
                user.getEmail(),
                user.getMobileNumber(),
                user.getAddress(),
                user.getGender(),
                user.getRole()
        );
    }
}
