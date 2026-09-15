package com.bambardara.demo.rbac;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.bambardara.demo.rbac.dto.ModulePermissionsResponse;
import com.bambardara.demo.rbac.dto.PermissionResponse;
import com.bambardara.demo.rbac.service.PermissionService;

/**
 * Verifies the permission catalogue (spec item: "permission catalogue
 * contains actual permissions") is read from the real permissions table -
 * seeded by V16__create_rbac_schema.sql - grouped by module, and not merely
 * whatever happens to be granted to any one role.
 */
@SpringBootTest
class PermissionCatalogServiceTest {

    @Autowired
    private PermissionService permissionService;

    @Test
    void catalog_isNotEmpty_andGroupedByModule() {

        List<ModulePermissionsResponse> catalog = permissionService.getCatalog();

        assertFalse(catalog.isEmpty(), "Catalog should contain every seeded module's permissions");

        boolean dashboardGroupFound = catalog.stream()
                .anyMatch(group -> "DASHBOARD".equals(group.getModuleCode())
                        && group.getPermissions().stream().anyMatch(p -> "DASHBOARD_VIEW".equals(p.getCode())));

        assertTrue(dashboardGroupFound, "DASHBOARD_VIEW should appear under the DASHBOARD module group");
    }

    @Test
    void catalog_financeGroup_containsSeededFinancePermissions() {

        List<ModulePermissionsResponse> catalog = permissionService.getCatalog();

        ModulePermissionsResponse finance = catalog.stream()
                .filter(g -> "FINANCE".equals(g.getModuleCode()))
                .findFirst()
                .orElseThrow(() -> new AssertionError("FINANCE module group missing from catalog"));

        List<String> codes = finance.getPermissions().stream().map(PermissionResponse::getCode).toList();

        assertTrue(codes.contains("FINANCE_VIEW"));
        assertTrue(codes.contains("FINANCE_APPROVE"));
    }

    @Test
    void catalog_isOrderedByModuleDisplayOrder_dashboardFirst() {

        List<ModulePermissionsResponse> catalog = permissionService.getCatalog();

        assertEquals("DASHBOARD", catalog.get(0).getModuleCode(),
                "DASHBOARD has display_order=1 in the seed data and should be the first group");
    }
}
