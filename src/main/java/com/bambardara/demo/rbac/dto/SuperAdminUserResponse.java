package com.bambardara.demo.rbac.dto;

public class SuperAdminUserResponse {

    private Integer id;
    private String name;
    private String email;
    private String roleCode;
    private String roleName;
    private String status;

    public SuperAdminUserResponse() {
    }

    public SuperAdminUserResponse(Integer id, String name, String email, String roleCode, String roleName,
            String status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.roleCode = roleCode;
        this.roleName = roleName;
        this.status = status;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
