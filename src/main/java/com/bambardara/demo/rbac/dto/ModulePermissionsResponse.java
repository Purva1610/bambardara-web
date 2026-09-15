package com.bambardara.demo.rbac.dto;

import java.util.List;

/**
 * One module's slice of the permission catalogue (GET /api/super-admin/permissions):
 * the module's identity plus every permission scoped to it, so the frontend
 * can render Module -> [View, Create, Edit, ...] without any client-side
 * grouping logic.
 */
public class ModulePermissionsResponse {

    private Integer moduleId;
    private String moduleCode;
    private String moduleName;
    private List<PermissionResponse> permissions;

    public ModulePermissionsResponse() {
    }

    public ModulePermissionsResponse(Integer moduleId, String moduleCode, String moduleName,
            List<PermissionResponse> permissions) {
        this.moduleId = moduleId;
        this.moduleCode = moduleCode;
        this.moduleName = moduleName;
        this.permissions = permissions;
    }

    public Integer getModuleId() {
        return moduleId;
    }

    public void setModuleId(Integer moduleId) {
        this.moduleId = moduleId;
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

    public List<PermissionResponse> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<PermissionResponse> permissions) {
        this.permissions = permissions;
    }
}
