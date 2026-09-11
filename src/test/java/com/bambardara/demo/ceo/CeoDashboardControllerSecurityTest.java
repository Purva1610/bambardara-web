package com.bambardara.demo.ceo;

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
 * Authorization boundary tests for GET /api/ceo/dashboard, matching the
 * live-verified matrix from the CEO authentication foundation task
 * (no token -> 401, USER -> 403, ADMIN -> 403, CEO -> 200).
 *
 * Uses {@code @WithMockUser} to place a Spring Security authority directly
 * in the test's SecurityContext rather than exercising a real Keycloak JWT -
 * this checks the same thing SecurityConfig's {@code hasRole("CEO")}
 * matcher and the controller's {@code @PreAuthorize} check, without
 * depending on a running Keycloak container.
 */
@SpringBootTest
@AutoConfigureMockMvc
class CeoDashboardControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void noToken_isUnauthorized() throws Exception {

        mockMvc.perform(get("/api/ceo/dashboard"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(authorities = "ROLE_USER")
    void userRole_isForbidden() throws Exception {

        mockMvc.perform(get("/api/ceo/dashboard"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_ADMIN")
    void adminRole_isForbidden() throws Exception {

        mockMvc.perform(get("/api/ceo/dashboard"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_CEO")
    void ceoRole_isAuthorized_investmentPopulated_constructionStillMissing() throws Exception {

        mockMvc.perform(get("/api/ceo/dashboard"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.investment").exists())
                .andExpect(jsonPath("$.investment.raisedAmount").exists())
                .andExpect(jsonPath("$.construction").doesNotExist())
                .andExpect(jsonPath("$.unavailableDomains", org.hamcrest.Matchers.not(org.hamcrest.Matchers.hasItem("INVESTMENT"))))
                .andExpect(jsonPath("$.unavailableDomains", org.hamcrest.Matchers.hasItem("CONSTRUCTION")));
    }
}
