package com.bambardara.demo.rbac;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Authorization boundary tests for /api/super-admin/**, matching the matrix
 * required by the RBAC spec: no token -> 401; USER/ADMIN/CEO/any non-
 * SUPER_ADMIN business role -> 403; SUPER_ADMIN -> 200. Mirrors
 * CeoDashboardControllerSecurityTest's use of @WithMockUser to place the
 * authority directly in the SecurityContext rather than exercising a real
 * Keycloak JWT.
 */
@SpringBootTest
@AutoConfigureMockMvc
class SuperAdminSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    // --- GET /api/super-admin/roles ---------------------------------------

    @Test
    void roles_noToken_isUnauthorized() throws Exception {
        mockMvc.perform(get("/api/super-admin/roles")).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(authorities = "ROLE_USER")
    void roles_userRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/roles")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_ADMIN")
    void roles_adminRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/roles")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_CEO")
    void roles_ceoRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/roles")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_MD")
    void roles_mdRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/roles")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_EMPLOYEE")
    void roles_employeeRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/roles")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_SUPER_ADMIN")
    void roles_superAdminRole_isAuthorized() throws Exception {
        mockMvc.perform(get("/api/super-admin/roles")).andExpect(status().isOk());
    }

    // --- GET /api/super-admin/modules -------------------------------------

    @Test
    void modules_noToken_isUnauthorized() throws Exception {
        mockMvc.perform(get("/api/super-admin/modules")).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(authorities = "ROLE_USER")
    void modules_userRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/modules")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_SUPER_ADMIN")
    void modules_superAdminRole_isAuthorized_andReturnsSeededModules() throws Exception {
        mockMvc.perform(get("/api/super-admin/modules"))
                .andExpect(status().isOk());
    }

    // --- GET /api/super-admin/users ---------------------------------------

    @Test
    void users_noToken_isUnauthorized() throws Exception {
        mockMvc.perform(get("/api/super-admin/users")).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(authorities = "ROLE_CEO")
    void users_ceoRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/users")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_SUPER_ADMIN")
    void users_superAdminRole_isAuthorized() throws Exception {
        mockMvc.perform(get("/api/super-admin/users")).andExpect(status().isOk());
    }

    // --- GET /api/super-admin/roles/{roleId}/modules ----------------------

    @Test
    @WithMockUser(authorities = "ROLE_MANAGER")
    void roleModules_managerRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/roles/1/modules")).andExpect(status().isForbidden());
    }

    // --- GET /api/super-admin/permissions ----------------------------------

    @Test
    void permissions_noToken_isUnauthorized() throws Exception {
        mockMvc.perform(get("/api/super-admin/permissions")).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(authorities = "ROLE_USER")
    void permissions_userRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/permissions")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_CEO")
    void permissions_ceoRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/permissions")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_CFO")
    void permissions_cfoRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/permissions")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_MD")
    void permissions_mdRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/permissions")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_PROJECT_DIRECTOR")
    void permissions_projectDirectorRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/permissions")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_MANAGER")
    void permissions_managerRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/permissions")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_EMPLOYEE")
    void permissions_employeeRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/permissions")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_SUPER_ADMIN")
    void permissions_superAdminRole_isAuthorized_andReturnsCatalogGroupedByModule() throws Exception {
        mockMvc.perform(get("/api/super-admin/permissions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", org.hamcrest.Matchers.not(org.hamcrest.Matchers.empty())))
                .andExpect(jsonPath("$[0].moduleCode").exists())
                .andExpect(jsonPath("$[0].permissions").isArray());
    }

    // --- GET /api/super-admin/audit-logs -----------------------------------

    @Test
    void auditLogs_noToken_isUnauthorized() throws Exception {
        mockMvc.perform(get("/api/super-admin/audit-logs")).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(authorities = "ROLE_USER")
    void auditLogs_userRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/audit-logs")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_CEO")
    void auditLogs_ceoRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/audit-logs")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_CFO")
    void auditLogs_cfoRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/audit-logs")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_MD")
    void auditLogs_mdRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/audit-logs")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_PROJECT_DIRECTOR")
    void auditLogs_projectDirectorRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/audit-logs")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_MANAGER")
    void auditLogs_managerRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/audit-logs")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_EMPLOYEE")
    void auditLogs_employeeRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/super-admin/audit-logs")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_SUPER_ADMIN")
    void auditLogs_superAdminRole_isAuthorized() throws Exception {
        mockMvc.perform(get("/api/super-admin/audit-logs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray());
    }
}
