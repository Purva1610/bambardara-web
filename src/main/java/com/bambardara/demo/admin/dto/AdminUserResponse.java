package com.bambardara.demo.admin.dto;

import com.bambardara.demo.auth.entity.Gender;
import com.bambardara.demo.auth.entity.UserRole;

/**
 * User response for admin user list (summary view).
 * 
 * Excludes sensitive information like password.
 */
public class AdminUserResponse {

    private Integer id;
    private String firebaseUid;
    private String name;
    private String email;
    private String mobileNumber;
    private UserRole role;
    private Gender gender;

    public AdminUserResponse() {
    }

    public AdminUserResponse(
            Integer id,
            String firebaseUid,
            String name,
            String email,
            String mobileNumber,
            UserRole role,
            Gender gender) {
        this.id = id;
        this.firebaseUid = firebaseUid;
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.role = role;
        this.gender = gender;
    }

    /**
     * @return Integer return the id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return String return the firebaseUid
     */
    public String getFirebaseUid() {
        return firebaseUid;
    }

    /**
     * @param firebaseUid the firebaseUid to set
     */
    public void setFirebaseUid(String firebaseUid) {
        this.firebaseUid = firebaseUid;
    }

    /**
     * @return String return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return String return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return String return the mobileNumber
     */
    public String getMobileNumber() {
        return mobileNumber;
    }

    /**
     * @param mobileNumber the mobileNumber to set
     */
    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    /**
     * @return UserRole return the role
     */
    public UserRole getRole() {
        return role;
    }

    /**
     * @param role the role to set
     */
    public void setRole(UserRole role) {
        this.role = role;
    }

    /**
     * @return Gender return the gender
     */
    public Gender getGender() {
        return gender;
    }

    /**
     * @param gender the gender to set
     */
    public void setGender(Gender gender) {
        this.gender = gender;
    }
}
