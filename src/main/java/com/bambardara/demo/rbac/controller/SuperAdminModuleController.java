package com.bambardara.demo.rbac.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.rbac.dto.ModuleResponse;
import com.bambardara.demo.rbac.service.ModuleService;

/**
 * Read-only module listing. Modules are system-defined (seeded by
 * V16__create_rbac_schema.sql) - no create/update endpoint in this phase.
 */
@RestController
@RequestMapping("/api/super-admin/modules")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class SuperAdminModuleController {

    private final ModuleService moduleService;

    public SuperAdminModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @GetMapping
    public ResponseEntity<List<ModuleResponse>> getModules() {
        return ResponseEntity.ok(moduleService.getAllModules());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModuleResponse> getModule(@PathVariable Integer id) {
        return ResponseEntity.ok(moduleService.getModuleById(id));
    }
}
