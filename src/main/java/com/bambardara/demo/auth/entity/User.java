package com.bambardara.demo.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    // Stored as text, not a number: a numeric column drops leading zeros and
    // cannot hold a country prefix, and we never do arithmetic on it.
    @Column(name = "mobile_number", nullable = false, length = 15)
    private String mobileNumber;

    @Column(nullable = false, length = 500)
    private String address;

    // STRING, not the default ORDINAL: ordinal stores 0/1/2, so reordering the
    // enum later would silently change the meaning of every existing row.
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Gender gender;

    // Firebase UID - the stable user identifier from Firebase Authentication
    // This is the primary authentication identifier, unique across all auth providers
    // Nullable temporarily to allow migration from existing data
    @Column(name = "firebase_uid", unique = true, nullable = true, length = 128)
    private String firebaseUid;

    // User role for authorization
    // Set via Firebase custom claims (admin: true)
    // Default is USER for new accounts
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserRole role = UserRole.USER;

    // DEPRECATED: Password authentication is now handled by Firebase
    @Column(nullable = true)
    @Deprecated
    private String password;

    // DEPRECATED: Replaced by firebaseUid
    @Column(name = "google_id", unique = true, length = 255)
    @Deprecated
    private String googleId;

    // DEPRECATED: Firebase handles all auth providers
    @Enumerated(EnumType.STRING)
    @Column(name = "auth_provider", nullable = true, length = 20)
    @Deprecated
    private AuthProvider authProvider;

    public User() {

    }

    /**
     * Constructor for Firebase authenticated users.
     * 
     * @param firebaseUid Firebase UID from verified ID token
     * @param name User's display name from Firebase
     * @param email User's email from Firebase
     */
    public User(String firebaseUid, String name, String email) {
        this.firebaseUid = firebaseUid;
        this.name = name;
        this.email = email;
        
        // Set defaults for fields that users can complete later
        this.mobileNumber = "";
        this.address = "";
        this.gender = Gender.OTHER;
        this.role = UserRole.USER;  // Default role for new users
    }

    /**
     * @deprecated Constructor for LOCAL (email/password) users - no longer used
     */
    @Deprecated
    public User(
            String name,
            String email,
            String mobileNumber,
            String address,
            Gender gender,
            String password) {

        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.address = address;
        this.gender = gender;
        this.password = password;
        this.authProvider = AuthProvider.LOCAL;
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
     * @return String return the password
     * @deprecated Password authentication is handled by Firebase
     */
    @Deprecated
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     * @deprecated Password authentication is handled by Firebase
     */
    @Deprecated
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return String return the googleId
     * @deprecated Replaced by firebaseUid
     */
    @Deprecated
    public String getGoogleId() {
        return googleId;
    }

    /**
     * @param googleId the googleId to set
     * @deprecated Replaced by firebaseUid
     */
    @Deprecated
    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    /**
     * @return AuthProvider return the authProvider
     * @deprecated Firebase handles all auth providers
     */
    @Deprecated
    public AuthProvider getAuthProvider() {
        return authProvider;
    }

    /**
     * @param authProvider the authProvider to set
     * @deprecated Firebase handles all auth providers
     */
    @Deprecated
    public void setAuthProvider(AuthProvider authProvider) {
        this.authProvider = authProvider;
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
