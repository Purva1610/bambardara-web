package com.bambardara.demo.rbac.dto;

public class ModuleResponse {

    private Integer id;
    private String name;
    private String code;
    private String description;
    private String parentCode;
    private int displayOrder;
    private boolean active;

    public ModuleResponse() {
    }

    public ModuleResponse(Integer id, String name, String code, String description,
            String parentCode, int displayOrder, boolean active) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.description = description;
        this.parentCode = parentCode;
        this.displayOrder = displayOrder;
        this.active = active;
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

    public String getParentCode() {
        return parentCode;
    }

    public void setParentCode(String parentCode) {
        this.parentCode = parentCode;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(int displayOrder) {
        this.displayOrder = displayOrder;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
