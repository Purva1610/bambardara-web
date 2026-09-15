package com.bambardara.demo.rbac.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/** One entry of a PUT /api/super-admin/roles/{roleId}/modules request body. */
public class ModuleToggleItem {

    @NotBlank
    private String moduleCode;

    @NotNull
    private Boolean enabled;

    public String getModuleCode() {
        return moduleCode;
    }

    public void setModuleCode(String moduleCode) {
        this.moduleCode = moduleCode;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
}
