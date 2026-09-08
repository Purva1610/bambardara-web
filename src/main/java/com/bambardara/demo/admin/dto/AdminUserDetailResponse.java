package com.bambardara.demo.admin.dto;

import com.bambardara.demo.auth.entity.Gender;
import com.bambardara.demo.auth.entity.UserRole;

/**
 * Detailed user response for admin (single user view).
 * 
 * Includes all non-sensitive user information.
 * Excludes password hash and Firebase credentials.
 */
public class AdminUserDetailResponse {

    private Integer id;
    private String firebaseUid;
    private String name;
    private String email;
    private String mobileNumber;
    private String address;
    private Gender gender;
    private UserRole role;

    public AdminUserDetailResponse() {
    }

    public AdminUserDetailResponse(
            Integer id,
            String firebaseUid,
            String name,
            String email,
            String mobileNumber,
            String address,
            Gender gender,
            UserRole role) {
        this.id = id;
        this.firebaseUid = firebaseUid;
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.address = address;
        this.gender = gender;
        this.role = role;
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
     * @return String return the address
     */
    public String getAddress() {
        return address;
    }

    /**
     * @param address the address to set
     */
    public void setAddress(String address) {
        this.address = address;
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
}
