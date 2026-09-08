package com.bambardara.demo.auth.dto;

public class LoginResponse {

    private String message;

    private int userId;

    private String name;

    private String email;

    // Bearer token the client must send back as "Authorization: Bearer <token>"
    // on every authenticated call.
    private String token;

    private long expiresInMillis;

    public LoginResponse() {

    }

    public LoginResponse(
            String message,
            int userId,
            String name,
            String email,
            String token,
            long expiresInMillis) {

        this.message = message;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.token = token;
        this.expiresInMillis = expiresInMillis;

    }

    /**
     * @return String return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * @return String return the userId
     */
    public int  getUserId() {
        return userId;
    }

    /**
     * @param userId the userId to set
     */
    public void setUserId(int userId) {
        this.userId = userId;
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
     * @return String return the token
     */
    public String getToken() {
        return token;
    }

    /**
     * @param token the token to set
     */
    public void setToken(String token) {
        this.token = token;
    }

    /**
     * @return long return the expiresInMillis
     */
    public long getExpiresInMillis() {
        return expiresInMillis;
    }

    /**
     * @param expiresInMillis the expiresInMillis to set
     */
    public void setExpiresInMillis(long expiresInMillis) {
        this.expiresInMillis = expiresInMillis;
    }

}