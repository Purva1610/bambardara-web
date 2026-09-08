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

    /**
     * Legacy Firebase UID. Firebase authentication has been fully removed
     * (see keycloakSubject below, the current external identity mapping) -
     * this column is read-only history for users who signed up before the
     * Keycloak migration and is never written to for new users.
     */
    @Column(name = "firebase_uid", unique = true, length = 128)
    private String firebaseUid;

    /**
     * Keycloak identity - the OIDC "sub" claim from a validated Keycloak
     * access token. Stable across whatever identity providers Keycloak
     * itself federates (email, Google, etc.), unlike email.
     * Nullable during migration: only set once a user has authenticated
     * through Keycloak at least once.
     */
    @Column(name = "keycloak_subject", unique = true, length = 255)
    private String keycloakSubject;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    // Stored as text, not a number: a numeric column drops leading zeros and
    // cannot hold a country prefix, and we never do arithmetic on it.
    // Nullable: Keycloak-provisioned users don't have one until a profile update.
    @Column(name = "mobile_number", length = 15)
    private String mobileNumber;

    // Nullable: Keycloak-provisioned users don't have one until a profile update.
    @Column(length = 500)
    private String address;

    // STRING, not the default ORDINAL: ordinal stores 0/1/2, so reordering the
    // enum later would silently change the meaning of every existing row.
    // Nullable: Keycloak-provisioned users don't have one until a profile update.
    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Gender gender;

    // BCrypt hash, never the raw password.
    // Nullable: Keycloak-authenticated users have no password stored locally -
    // Keycloak owns credentials entirely.
    @Column
    private String password;

    /**
     * User role for authorization (USER, ADMIN, MARKETING). Never elevated
     * automatically from anything a client or identity token sends - see
     * KeycloakUserProvisioningService.
     * Default: USER for all new users.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserRole role = UserRole.USER;

    public User() {

    }

    /**
     * Constructor for existing password-based users (migration/legacy).
     */
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
        this.role = UserRole.USER;
    }

    /**
     * Creates a new local user for someone authenticating through Keycloak
     * for the first time. Always defaults to the safe USER role - see
     * KeycloakUserProvisioningService for why a privileged role is never
     * assigned here. A static factory method rather than another constructor
     * overload, since (name, email, keycloakSubject) would otherwise be
     * ambiguous with the existing (firebaseUid, name, email) constructor.
     */
    public static User forKeycloakSubject(String keycloakSubject, String name, String email) {

        User user = new User();
        user.keycloakSubject = keycloakSubject;
        user.name = name;
        user.email = email;
        user.role = UserRole.USER;
        // Other fields remain null and can be filled later via profile update
        return user;
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
     * @return String return the keycloakSubject
     */
    public String getKeycloakSubject() {
        return keycloakSubject;
    }

    /**
     * @param keycloakSubject the keycloakSubject to set
     */
    public void setKeycloakSubject(String keycloakSubject) {
        this.keycloakSubject = keycloakSubject;
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
     * @return String return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
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
