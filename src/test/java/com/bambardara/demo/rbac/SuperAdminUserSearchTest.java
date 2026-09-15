package com.bambardara.demo.rbac;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.auth.entity.UserStatus;
import com.bambardara.demo.auth.repository.UserRepository;
import com.bambardara.demo.rbac.dto.SuperAdminUserResponse;
import com.bambardara.demo.rbac.entity.Role;
import com.bambardara.demo.rbac.repository.RoleRepository;
import com.bambardara.demo.rbac.service.SuperAdminUserService;

/**
 * GET /api/super-admin/users' search/filter/pagination, exercised directly
 * against the service (and therefore the real Specification -> SQL path,
 * see UserSpecifications) rather than loading everything and filtering in
 * Java.
 */
@SpringBootTest
@Transactional
class SuperAdminUserSearchTest {

    @Autowired
    private SuperAdminUserService superAdminUserService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    private final String marker = UUID.randomUUID().toString().substring(0, 8);

    private Pageable pageable() {
        return PageRequest.of(0, 50, Sort.by(Sort.Direction.DESC, "id"));
    }

    private void seedUsers() {

        Role md = roleRepository.findByCode("MD").orElseThrow();
        Role employee = roleRepository.findByCode("EMPLOYEE").orElseThrow();

        persist("Abhay Search-" + marker, "abhay." + marker + "@bambardara.com", md, UserStatus.ACTIVE);
        persist("Priya Search-" + marker, "priya." + marker + "@bambardara.com", employee, UserStatus.ACTIVE);
        persist("Rahul Search-" + marker, "rahul." + marker + "@bambardara.com", employee, UserStatus.DISABLED);
    }

    private void persist(String name, String email, Role role, UserStatus status) {
        String subject = "search-test-" + UUID.randomUUID();
        User user = User.forKeycloakSubject(subject, name, email);
        user.setBusinessRole(role);
        user.setStatus(status);
        userRepository.saveAndFlush(user);
    }

    @Test
    void search_matchesByName() {

        seedUsers();

        Page<SuperAdminUserResponse> page = superAdminUserService.getAllUsers("Abhay Search-" + marker, null, null, pageable());

        assertEquals(1, page.getTotalElements());
        assertEquals("MD", page.getContent().get(0).getRoleCode());
    }

    @Test
    void search_matchesByEmail_caseInsensitive() {

        seedUsers();

        Page<SuperAdminUserResponse> page =
                superAdminUserService.getAllUsers(("PRIYA." + marker).toUpperCase(), null, null, pageable());

        assertEquals(1, page.getTotalElements());
        assertEquals("priya." + marker + "@bambardara.com", page.getContent().get(0).getEmail());
    }

    @Test
    void filter_byRole_returnsOnlyThatRole() {

        seedUsers();

        Page<SuperAdminUserResponse> page = superAdminUserService.getAllUsers(marker, "EMPLOYEE", null, pageable());

        List<SuperAdminUserResponse> content = page.getContent();
        assertEquals(2, content.size());
        assertTrue(content.stream().allMatch(u -> "EMPLOYEE".equals(u.getRoleCode())));
    }

    @Test
    void filter_byStatus_returnsOnlyThatStatus() {

        seedUsers();

        Page<SuperAdminUserResponse> page = superAdminUserService.getAllUsers(marker, null, "DISABLED", pageable());

        assertEquals(1, page.getTotalElements());
        assertEquals("DISABLED", page.getContent().get(0).getStatus());
    }

    @Test
    void combinedFilters_searchRoleAndStatus() {

        seedUsers();

        Page<SuperAdminUserResponse> page =
                superAdminUserService.getAllUsers(marker, "EMPLOYEE", "ACTIVE", pageable());

        assertEquals(1, page.getTotalElements());
        assertEquals("priya." + marker + "@bambardara.com", page.getContent().get(0).getEmail());
    }

    @Test
    void pagination_respectsPageSize() {

        seedUsers();

        Page<SuperAdminUserResponse> firstPage =
                superAdminUserService.getAllUsers(marker, null, null, PageRequest.of(0, 2, Sort.by(Sort.Direction.DESC, "id")));

        assertEquals(2, firstPage.getContent().size());
        assertEquals(3, firstPage.getTotalElements());
        assertEquals(2, firstPage.getTotalPages());
    }

    @Test
    void invalidStatus_isRejected() {

        org.junit.jupiter.api.Assertions.assertThrows(IllegalArgumentException.class,
                () -> superAdminUserService.getAllUsers(null, null, "NOT_A_REAL_STATUS", pageable()));
    }
}
