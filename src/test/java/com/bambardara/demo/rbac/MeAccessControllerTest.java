package com.bambardara.demo.rbac;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.auth.repository.UserRepository;
import com.bambardara.demo.rbac.dto.ModuleToggleItem;
import com.bambardara.demo.rbac.entity.Role;
import com.bambardara.demo.rbac.repository.RoleRepository;
import com.bambardara.demo.rbac.service.RoleAccessService;

/**
 * GET /api/me/access: no token -> 401; an authenticated user with no
 * business role -> empty modules/permissions; enabling a module for the
 * user's role surfaces it, and only enabled modules are returned (spec items
 * 7 and 8). Authenticates via a real {@link User} entity through
 * {@code authentication(...)}, the same principal type
 * KeycloakJwtProvisioningFilter populates - a plain {@code @WithMockUser}
 * cannot stand in here since the controller reads
 * {@code @AuthenticationPrincipal User}, not a Spring UserDetails.
 */
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class MeAccessControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RoleAccessService roleAccessService;

    @Test
    void noToken_isUnauthorized() throws Exception {
        mockMvc.perform(get("/api/me/access")).andExpect(status().isUnauthorized());
    }

    @Test
    void userWithNoBusinessRole_hasEmptyModulesAndPermissions() throws Exception {

        User user = persistUser("no-role");

        mockMvc.perform(get("/api/me/access").with(authentication(authenticationFor(user))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.role").doesNotExist())
                .andExpect(jsonPath("$.modules", org.hamcrest.Matchers.empty()))
                .andExpect(jsonPath("$.permissions", org.hamcrest.Matchers.empty()));
    }

    @Test
    void onlyEnabledModulesAreReturned_forTheUsersRole() throws Exception {

        Role ceoRole = roleRepository.findByCode("CEO").orElseThrow();

        ModuleToggleItem enableFinance = new ModuleToggleItem();
        enableFinance.setModuleCode("FINANCE");
        enableFinance.setEnabled(true);

        ModuleToggleItem disableHr = new ModuleToggleItem();
        disableHr.setModuleCode("HR");
        disableHr.setEnabled(false);

        User actor = persistUser("actor-for-setup");
        roleAccessService.setModuleAccess(actor, ceoRole.getId(), List.of(enableFinance, disableHr));

        User user = persistUser("ceo-user");
        user.setBusinessRole(ceoRole);
        userRepository.save(user);

        mockMvc.perform(get("/api/me/access").with(authentication(authenticationFor(user))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.role").value("CEO"))
                .andExpect(jsonPath("$.modules", org.hamcrest.Matchers.hasItem("FINANCE")))
                .andExpect(jsonPath("$.modules", org.hamcrest.Matchers.not(org.hamcrest.Matchers.hasItem("HR"))));
    }

    private User persistUser(String label) {

        String subject = "test-subject-" + label + "-" + UUID.randomUUID();
        User user = User.forKeycloakSubject(subject, "Test " + label, subject + "@keycloak.local");
        return userRepository.saveAndFlush(user);
    }

    private Authentication authenticationFor(User user) {
        return new UsernamePasswordAuthenticationToken(user, null, List.of(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
