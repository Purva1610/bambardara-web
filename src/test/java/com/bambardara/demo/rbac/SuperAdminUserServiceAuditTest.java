package com.bambardara.demo.rbac;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.auth.entity.UserStatus;
import com.bambardara.demo.auth.repository.UserRepository;
import com.bambardara.demo.auth.service.KeycloakAdminService;
import com.bambardara.demo.rbac.dto.CreateSuperAdminUserRequest;
import com.bambardara.demo.rbac.dto.UpdateSuperAdminUserRequest;
import com.bambardara.demo.rbac.entity.Role;
import com.bambardara.demo.rbac.repository.RoleRepository;
import com.bambardara.demo.rbac.service.AuditLogService;
import com.bambardara.demo.rbac.service.SuperAdminUserService;

/**
 * Pure Mockito unit tests (no Spring context, no real Keycloak/Postgres) for
 * SuperAdminUserService's audit logging - one test per operation the RBAC
 * spec requires an audit record for: user created, user role changed, user
 * disabled, user enabled. Keeping this a plain unit test (rather than
 * @SpringBootTest) means it doesn't need KEYCLOAK_ISSUER_URI/admin client
 * credentials configured to run, unlike a real KeycloakAdminService.createUser
 * call would.
 */
class SuperAdminUserServiceAuditTest {

    private final UserRepository userRepository = mock(UserRepository.class);
    private final RoleRepository roleRepository = mock(RoleRepository.class);
    private final KeycloakAdminService keycloakAdminService = mock(KeycloakAdminService.class);
    private final AuditLogService auditLogService = mock(AuditLogService.class);

    private final SuperAdminUserService service =
            new SuperAdminUserService(userRepository, roleRepository, keycloakAdminService, auditLogService);

    private final User actor = userWithId(1);

    @Test
    void createUser_recordsUserCreatedAudit() {

        Role employeeRole = roleWithCode(2, "EMPLOYEE");

        when(userRepository.findByEmail("new.hire@bambardara.com")).thenReturn(Optional.empty());
        when(roleRepository.findByCode("EMPLOYEE")).thenReturn(Optional.of(employeeRole));
        when(keycloakAdminService.createUser(anyString(), anyString(), anyString())).thenReturn("kc-subject-1");
        when(userRepository.saveAndFlush(any(User.class))).thenAnswer(invocation -> {
            User u = invocation.getArgument(0);
            u.setId(10);
            return u;
        });

        CreateSuperAdminUserRequest request = new CreateSuperAdminUserRequest();
        request.setName("New Hire");
        request.setEmail("new.hire@bambardara.com");
        request.setRoleCode("EMPLOYEE");

        service.createUser(actor, request);

        verify(auditLogService).record(eq(actor), eq("USER_CREATED"), eq("USER"), eq("10"),
                isNull(), anyString(), anyString());
    }

    @Test
    void updateUser_roleChange_recordsUserRoleAssignedAudit() {

        Role managerRole = roleWithCode(3, "MANAGER");
        User existing = userWithId(20);
        existing.setName("Existing User");
        existing.setEmail("existing@bambardara.com");
        existing.setBusinessRole(roleWithCode(4, "EMPLOYEE"));

        when(userRepository.findById(20)).thenReturn(Optional.of(existing));
        when(roleRepository.findByCode("MANAGER")).thenReturn(Optional.of(managerRole));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UpdateSuperAdminUserRequest request = new UpdateSuperAdminUserRequest();
        request.setName("Existing User");
        request.setRoleCode("MANAGER");

        service.updateUser(actor, 20, request);

        verify(auditLogService).record(eq(actor), eq("USER_ROLE_ASSIGNED"), eq("USER"), eq("20"),
                anyString(), anyString(), anyString());
    }

    @Test
    void updateStatus_toDisabled_recordsUserDisabledAudit() {

        User existing = userWithId(30);
        existing.setEmail("someone@bambardara.com");
        existing.setStatus(UserStatus.ACTIVE);
        existing.setBusinessRole(roleWithCode(5, "EMPLOYEE"));

        when(userRepository.findById(30)).thenReturn(Optional.of(existing));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        service.updateStatus(actor, 30, UserStatus.DISABLED);

        verify(auditLogService).record(eq(actor), eq("USER_DISABLED"), eq("USER"), eq("30"),
                eq("ACTIVE"), eq("DISABLED"), anyString());
    }

    @Test
    void updateStatus_toActive_recordsUserEnabledAudit() {

        User existing = userWithId(40);
        existing.setEmail("someone-else@bambardara.com");
        existing.setStatus(UserStatus.DISABLED);
        existing.setBusinessRole(roleWithCode(6, "EMPLOYEE"));

        when(userRepository.findById(40)).thenReturn(Optional.of(existing));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        service.updateStatus(actor, 40, UserStatus.ACTIVE);

        verify(auditLogService).record(eq(actor), eq("USER_ENABLED"), eq("USER"), eq("40"),
                eq("DISABLED"), eq("ACTIVE"), anyString());
    }

    @Test
    void updateStatus_unchanged_doesNotRecordAudit() {

        User existing = userWithId(50);
        existing.setEmail("noop@bambardara.com");
        existing.setStatus(UserStatus.ACTIVE);

        when(userRepository.findById(50)).thenReturn(Optional.of(existing));

        service.updateStatus(actor, 50, UserStatus.ACTIVE);

        org.mockito.Mockito.verifyNoInteractions(auditLogService);
    }

    private static User userWithId(Integer id) {
        User user = new User();
        user.setId(id);
        user.setName("Actor " + id);
        user.setEmail("actor" + id + "@bambardara.com");
        return user;
    }

    private static Role roleWithCode(Integer id, String code) {
        Role role = new Role();
        role.setId(id);
        role.setCode(code);
        role.setName(code);
        return role;
    }
}
