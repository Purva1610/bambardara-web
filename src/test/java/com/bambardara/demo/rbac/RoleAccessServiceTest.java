package com.bambardara.demo.rbac;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.auth.repository.UserRepository;
import com.bambardara.demo.rbac.dto.ModuleToggleItem;
import com.bambardara.demo.rbac.dto.RoleModuleResponse;
import com.bambardara.demo.rbac.entity.Role;
import com.bambardara.demo.rbac.repository.AuditLogRepository;
import com.bambardara.demo.rbac.repository.RoleRepository;
import com.bambardara.demo.rbac.service.AuthorizationService;
import com.bambardara.demo.rbac.service.RoleAccessService;

/**
 * Exercises the actual Super Admin toggle mechanism directly against the
 * service layer: enabling/disabling a module for a role (spec items 5, 6),
 * a permission change being reflected via AuthorizationService (item 9), and
 * every mutating call producing an audit log row (item 11).
 */
@SpringBootTest
@Transactional
class RoleAccessServiceTest {

    @Autowired
    private RoleAccessService roleAccessService;

    @Autowired
    private AuthorizationService authorizationService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Test
    void enablingThenDisablingAModule_toggles_andEachChangeIsAudited() {

        User actor = persistActor();
        Role md = roleRepository.findByCode("MD").orElseThrow();

        long auditCountBefore = auditLogRepository.count();

        ModuleToggleItem enableFinance = new ModuleToggleItem();
        enableFinance.setModuleCode("FINANCE");
        enableFinance.setEnabled(true);

        List<RoleModuleResponse> afterEnable =
                roleAccessService.setModuleAccess(actor, md.getId(), List.of(enableFinance));

        assertTrue(afterEnable.stream()
                .anyMatch(m -> m.getModuleCode().equals("FINANCE") && m.isEnabled()));
        assertEquals(auditCountBefore + 1, auditLogRepository.count());

        ModuleToggleItem disableFinance = new ModuleToggleItem();
        disableFinance.setModuleCode("FINANCE");
        disableFinance.setEnabled(false);

        List<RoleModuleResponse> afterDisable =
                roleAccessService.setModuleAccess(actor, md.getId(), List.of(disableFinance));

        assertTrue(afterDisable.stream()
                .anyMatch(m -> m.getModuleCode().equals("FINANCE") && !m.isEnabled()));
        assertEquals(auditCountBefore + 2, auditLogRepository.count());
    }

    @Test
    void grantingAPermission_isReflectedImmediately_byAuthorizationService() {

        User actor = persistActor();
        Role manager = roleRepository.findByCode("MANAGER").orElseThrow();

        User managerUser = persistActor();
        managerUser.setBusinessRole(manager);
        userRepository.save(managerUser);

        assertFalse(authorizationService.hasPermission(managerUser, "PROJECT_VIEW"));

        roleAccessService.setPermissions(actor, manager.getId(), List.of("PROJECT_VIEW"));

        assertTrue(authorizationService.hasPermission(managerUser, "PROJECT_VIEW"));

        roleAccessService.setPermissions(actor, manager.getId(), List.of());

        assertFalse(authorizationService.hasPermission(managerUser, "PROJECT_VIEW"));
    }

    @Test
    void unknownModuleCode_isRejected() {

        User actor = persistActor();
        Role employee = roleRepository.findByCode("EMPLOYEE").orElseThrow();

        ModuleToggleItem bogus = new ModuleToggleItem();
        bogus.setModuleCode("NOT_A_REAL_MODULE");
        bogus.setEnabled(true);

        assertThrows(IllegalArgumentException.class,
                () -> roleAccessService.setModuleAccess(actor, employee.getId(), List.of(bogus)));
    }

    @Test
    void unknownPermissionCode_isRejected() {

        User actor = persistActor();
        Role employee = roleRepository.findByCode("EMPLOYEE").orElseThrow();

        assertThrows(IllegalArgumentException.class,
                () -> roleAccessService.setPermissions(actor, employee.getId(), List.of("NOT_A_REAL_PERMISSION")));
    }

    private User persistActor() {
        String subject = "audit-actor-" + UUID.randomUUID();
        User user = User.forKeycloakSubject(subject, "Audit Actor", subject + "@keycloak.local");
        return userRepository.saveAndFlush(user);
    }
}
