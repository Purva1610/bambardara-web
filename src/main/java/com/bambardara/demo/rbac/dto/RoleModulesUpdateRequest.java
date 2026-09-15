package com.bambardara.demo.rbac.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

public class RoleModulesUpdateRequest {

    @NotEmpty
    @Valid
    private List<ModuleToggleItem> modules;

    public List<ModuleToggleItem> getModules() {
        return modules;
    }

    public void setModules(List<ModuleToggleItem> modules) {
        this.modules = modules;
    }
}
