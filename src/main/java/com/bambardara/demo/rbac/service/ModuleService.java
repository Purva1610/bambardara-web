package com.bambardara.demo.rbac.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.common.exception.ResourceNotFoundException;
import com.bambardara.demo.rbac.dto.ModuleResponse;
import com.bambardara.demo.rbac.entity.Module;
import com.bambardara.demo.rbac.repository.ModuleRepository;

/**
 * Read-only module listing for /api/super-admin/modules/**. Modules are
 * system-defined (seeded by V16); this phase does not expose module
 * creation - see the implementation plan.
 */
@Service
public class ModuleService {

    private final ModuleRepository moduleRepository;

    public ModuleService(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    @Transactional(readOnly = true)
    public List<ModuleResponse> getAllModules() {
        return moduleRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ModuleResponse getModuleById(Integer id) {
        return toResponse(findByIdOrThrow(id));
    }

    @Transactional(readOnly = true)
    public Module findByIdOrThrow(Integer id) {
        return moduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Module", id));
    }

    @Transactional(readOnly = true)
    public Module findByCodeOrThrow(String code) {
        return moduleRepository.findByCode(code)
                .orElseThrow(() -> new IllegalArgumentException("Unknown module code: " + code));
    }

    private ModuleResponse toResponse(Module module) {
        return new ModuleResponse(
                module.getId(),
                module.getName(),
                module.getCode(),
                module.getDescription(),
                module.getParent() != null ? module.getParent().getCode() : null,
                module.getDisplayOrder(),
                module.isActive());
    }
}
