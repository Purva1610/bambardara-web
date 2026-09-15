package com.bambardara.demo.rbac.dto;

public class PermissionResponse {

    private Integer id;
    private String name;
    private String code;
    private String description;
    private String moduleCode;

    public PermissionResponse() {
    }

    public PermissionResponse(Integer id, String name, String code, String description, String moduleCode) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.description = description;
        this.moduleCode = moduleCode;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getModuleCode() {
        return moduleCode;
    }

    public void setModuleCode(String moduleCode) {
        this.moduleCode = moduleCode;
    }
}
