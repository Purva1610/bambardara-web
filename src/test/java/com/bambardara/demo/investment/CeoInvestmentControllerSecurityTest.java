package com.bambardara.demo.investment;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Authorization + validation boundary tests for the four Investment-domain
 * CEO endpoints, matching the same matrix already verified live for
 * /api/ceo/dashboard and /api/ceo/auth-test: no token -> 401, USER -> 403,
 * ADMIN -> 403 (CEO is not ADMIN and must not implicitly gain investment
 * access), CEO -> 200/201.
 */
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class CeoInvestmentControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    // --- GET /api/ceo/funding-rounds ------------------------------------

    @Test
    void fundingRounds_noToken_isUnauthorized() throws Exception {
        mockMvc.perform(get("/api/ceo/funding-rounds")).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(authorities = "ROLE_USER")
    void fundingRounds_userRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/ceo/funding-rounds")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_ADMIN")
    void fundingRounds_adminRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/ceo/funding-rounds")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_CEO")
    void fundingRounds_ceoRole_isAuthorized_andReturnsSeededRounds() throws Exception {
        mockMvc.perform(get("/api/ceo/funding-rounds"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", org.hamcrest.Matchers.hasSize(3)))
                .andExpect(jsonPath("$[0].raisedAmount").exists())
                .andExpect(jsonPath("$[0].targetAmount").exists());
    }

    // --- GET /api/ceo/investors ------------------------------------------

    @Test
    void investors_noToken_isUnauthorized() throws Exception {
        mockMvc.perform(get("/api/ceo/investors")).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(authorities = "ROLE_USER")
    void investors_userRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/ceo/investors")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_CEO")
    void investors_ceoRole_isAuthorized() throws Exception {
        mockMvc.perform(get("/api/ceo/investors"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").exists());
    }

    // --- POST /api/ceo/investors -----------------------------------------

    @Test
    @WithMockUser(authorities = "ROLE_CEO")
    void createInvestor_ceoRole_validRequest_isCreated() throws Exception {
        mockMvc.perform(post("/api/ceo/investors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"MockMvc Test Investor\",\"email\":\"mockmvc@example.com\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("MockMvc Test Investor"))
                .andExpect(jsonPath("$.status").value("ACTIVE"));
    }

    @Test
    @WithMockUser(authorities = "ROLE_CEO")
    void createInvestor_blankName_failsValidation() throws Exception {
        mockMvc.perform(post("/api/ceo/investors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(authorities = "ROLE_CEO")
    void createInvestor_invalidStatus_failsValidation() throws Exception {
        mockMvc.perform(post("/api/ceo/investors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Bad Status Investor\",\"status\":\"NOT_A_REAL_STATUS\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(authorities = "ROLE_USER")
    void createInvestor_userRole_isForbidden() throws Exception {
        mockMvc.perform(post("/api/ceo/investors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Should Not Be Created\"}"))
                .andExpect(status().isForbidden());
    }

    // --- GET /api/ceo/investments ------------------------------------------

    @Test
    void investments_noToken_isUnauthorized() throws Exception {
        mockMvc.perform(get("/api/ceo/investments")).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(authorities = "ROLE_ADMIN")
    void investments_adminRole_isForbidden() throws Exception {
        mockMvc.perform(get("/api/ceo/investments")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROLE_CEO")
    void investments_ceoRole_isAuthorized() throws Exception {
        mockMvc.perform(get("/api/ceo/investments"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").exists());
    }
}
