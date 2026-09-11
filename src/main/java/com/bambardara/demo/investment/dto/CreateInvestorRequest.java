package com.bambardara.demo.investment.dto;

import com.bambardara.demo.common.validation.EnumValue;
import com.bambardara.demo.investment.entity.InvestmentStatus;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateInvestorRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 150, message = "Name must be between 2 and 150 characters")
    private String name;

    // Optional: not every investor record starts with a verified email.
    @Email(message = "Invalid email format")
    private String email;

    private String phone;

    private String organization;

    // Optional - defaults to ACTIVE in the service if left blank. Bound as a
    // String (not the enum directly) so an unknown value produces a normal
    // validation error instead of a Jackson deserialization failure, same
    // reasoning as RegisterRequest.gender.
    @EnumValue(enumClass = InvestmentStatus.class, message = "Status must be ACTIVE, UNDER_DOCS or WITHDRAWN")
    private String status;

    public CreateInvestorRequest() {
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
