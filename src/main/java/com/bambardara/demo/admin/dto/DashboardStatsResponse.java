package com.bambardara.demo.admin.dto;

import java.util.List;

/**
 * Dashboard statistics response for admin overview.
 * 
 * Provides aggregated metrics about users, contact requests, and system activity.
 */
public class DashboardStatsResponse {

    private long totalUsers;
    private long totalRequests;
    private long newRequests;
    private long inProgressRequests;
    private long resolvedRequests;
    private long closedRequests;
    private List<RecentContactRequest> recentRequests;

    public DashboardStatsResponse() {
    }

    public DashboardStatsResponse(
            long totalUsers,
            long totalRequests,
            long newRequests,
            long inProgressRequests,
            long resolvedRequests,
            long closedRequests,
            List<RecentContactRequest> recentRequests) {
        this.totalUsers = totalUsers;
        this.totalRequests = totalRequests;
        this.newRequests = newRequests;
        this.inProgressRequests = inProgressRequests;
        this.resolvedRequests = resolvedRequests;
        this.closedRequests = closedRequests;
        this.recentRequests = recentRequests;
    }

    /**
     * @return long return the totalUsers
     */
    public long getTotalUsers() {
        return totalUsers;
    }

    /**
     * @param totalUsers the totalUsers to set
     */
    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    /**
     * @return long return the totalRequests
     */
    public long getTotalRequests() {
        return totalRequests;
    }

    /**
     * @param totalRequests the totalRequests to set
     */
    public void setTotalRequests(long totalRequests) {
        this.totalRequests = totalRequests;
    }

    /**
     * @return long return the newRequests
     */
    public long getNewRequests() {
        return newRequests;
    }

    /**
     * @param newRequests the newRequests to set
     */
    public void setNewRequests(long newRequests) {
        this.newRequests = newRequests;
    }

    /**
     * @return long return the inProgressRequests
     */
    public long getInProgressRequests() {
        return inProgressRequests;
    }

    /**
     * @param inProgressRequests the inProgressRequests to set
     */
    public void setInProgressRequests(long inProgressRequests) {
        this.inProgressRequests = inProgressRequests;
    }

    /**
     * @return long return the resolvedRequests
     */
    public long getResolvedRequests() {
        return resolvedRequests;
    }

    /**
     * @param resolvedRequests the resolvedRequests to set
     */
    public void setResolvedRequests(long resolvedRequests) {
        this.resolvedRequests = resolvedRequests;
    }

    /**
     * @return long return the closedRequests
     */
    public long getClosedRequests() {
        return closedRequests;
    }

    /**
     * @param closedRequests the closedRequests to set
     */
    public void setClosedRequests(long closedRequests) {
        this.closedRequests = closedRequests;
    }

    /**
     * @return List<RecentContactRequest> return the recentRequests
     */
    public List<RecentContactRequest> getRecentRequests() {
        return recentRequests;
    }

    /**
     * @param recentRequests the recentRequests to set
     */
    public void setRecentRequests(List<RecentContactRequest> recentRequests) {
        this.recentRequests = recentRequests;
    }

    /**
     * Simplified contact request for recent activity display.
     */
    public static class RecentContactRequest {
        private Integer id;
        private String userName;
        private String email;
        private String concernType;
        private String status;
        private String createdAt;

        public RecentContactRequest() {
        }

        public RecentContactRequest(
                Integer id,
                String userName,
                String email,
                String concernType,
                String status,
                String createdAt) {
            this.id = id;
            this.userName = userName;
            this.email = email;
            this.concernType = concernType;
            this.status = status;
            this.createdAt = createdAt;
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
         * @return String return the userName
         */
        public String getUserName() {
            return userName;
        }

        /**
         * @param userName the userName to set
         */
        public void setUserName(String userName) {
            this.userName = userName;
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
         * @return String return the concernType
         */
        public String getConcernType() {
            return concernType;
        }

        /**
         * @param concernType the concernType to set
         */
        public void setConcernType(String concernType) {
            this.concernType = concernType;
        }

        /**
         * @return String return the status
         */
        public String getStatus() {
            return status;
        }

        /**
         * @param status the status to set
         */
        public void setStatus(String status) {
            this.status = status;
        }

        /**
         * @return String return the createdAt
         */
        public String getCreatedAt() {
            return createdAt;
        }

        /**
         * @param createdAt the createdAt to set
         */
        public void setCreatedAt(String createdAt) {
            this.createdAt = createdAt;
        }
    }
}
