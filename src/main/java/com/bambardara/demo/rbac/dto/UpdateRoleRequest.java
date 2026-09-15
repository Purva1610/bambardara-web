package com.bambardara.demo.rbac.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Role code is intentionally not editable here: it is referenced by
 * role_modules/role_permissions and (once a role is used) by the dynamic
 * ROLE_&lt;code&gt; Spring Security authority - renaming it in place would
 * silently detach existing assignments.
 */
public class UpdateRoleRequest {

    @NotBlank
    @Size(max = 100)
    private String name;

    @Size(max = 500)
    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
