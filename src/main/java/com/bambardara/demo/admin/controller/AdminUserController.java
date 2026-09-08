package com.bambardara.demo.admin.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.admin.dto.AdminUserDetailResponse;
import com.bambardara.demo.admin.dto.AdminUserResponse;
import com.bambardara.demo.admin.service.AdminUserService;

/**
 * Admin user management controller.
 * 
 * Provides user listing, search, and detail viewing for admins.
 * Does NOT expose sensitive information like passwords or tokens.
 * 
 * Security: ADMIN role only (enforced by Spring Security).
 */
@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final AdminUserService userService;

    public AdminUserController(AdminUserService userService) {
        this.userService = userService;
    }

    /**
     * Get paginated list of all users.
     * 
     * GET /api/admin/users?page=0&size=20
     * GET /api/admin/users?page=0&size=20&sort=email,asc
     * GET /api/admin/users?search=abhay&page=0&size=20
     * 
     * @param search optional search term (searches name and email)
     * @param page page number (default: 0)
     * @param size page size (default: 20)
     * @param sort sort field and direction (default: id,desc)
     * @return page of users
     */
    @GetMapping
    public ResponseEntity<Page<AdminUserResponse>> getUsers(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id,desc") String[] sort) {

        // Validate pagination parameters
        if (page < 0) {
            page = 0;
        }
        if (size < 1 || size > 100) {
            size = 20;
        }

        // Build pageable with sorting
        Sort.Direction direction = Sort.Direction.DESC;
        String property = "id";
        
        if (sort.length > 0) {
            property = sort[0];
        }
        if (sort.length > 1 && "asc".equalsIgnoreCase(sort[1])) {
            direction = Sort.Direction.ASC;
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, property));

        // Get users (with or without search)
        Page<AdminUserResponse> users;
        if (search != null && !search.trim().isEmpty()) {
            users = userService.searchUsers(search.trim(), pageable);
        } else {
            users = userService.getAllUsers(pageable);
        }

        return ResponseEntity.ok(users);
    }

    /**
     * Get detailed information about a specific user.
     * 
     * GET /api/admin/users/{id}
     * 
     * @param id user ID
     * @return user details
     */
    @GetMapping("/{id}")
    public ResponseEntity<AdminUserDetailResponse> getUserById(
            @PathVariable Integer id) {

        AdminUserDetailResponse user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
}
