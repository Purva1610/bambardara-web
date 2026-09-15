package com.bambardara.demo.rbac.dto;

import java.util.List;

public class MeAccessResponse {

    private UserInfo user;
    private List<String> modules;
    private List<String> permissions;

    public MeAccessResponse() {
    }

    public MeAccessResponse(UserInfo user, List<String> modules, List<String> permissions) {
        this.user = user;
        this.modules = modules;
        this.permissions = permissions;
    }

    public UserInfo getUser() {
        return user;
    }

    public void setUser(UserInfo user) {
        this.user = user;
    }

    public List<String> getModules() {
        return modules;
    }

    public void setModules(List<String> modules) {
        this.modules = modules;
    }

    public List<String> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<String> permissions) {
        this.permissions = permissions;
    }

    public static class UserInfo {

        private Integer id;
        private String name;
        private String email;
        private String role;

        public UserInfo() {
        }

        public UserInfo(Integer id, String name, String email, String role) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
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

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }
}
