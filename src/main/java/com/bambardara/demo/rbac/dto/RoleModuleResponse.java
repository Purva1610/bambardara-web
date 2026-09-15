package com.bambardara.demo.rbac.dto;

public class RoleModuleResponse {

    private String moduleCode;
    private String moduleName;
    private boolean enabled;

    public RoleModuleResponse() {
    }

    public RoleModuleResponse(String moduleCode, String moduleName, boolean enabled) {
        this.moduleCode = moduleCode;
        this.moduleName = moduleName;
        this.enabled = enabled;
    }

    public String getModuleCode() {
        return moduleCode;
    }

    public void setModuleCode(String moduleCode) {
        this.moduleCode = moduleCode;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
