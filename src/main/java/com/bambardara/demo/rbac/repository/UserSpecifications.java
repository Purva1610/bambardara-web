package com.bambardara.demo.rbac.repository;

import org.springframework.data.jpa.domain.Specification;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.auth.entity.UserStatus;

/**
 * Database-level filters for GET /api/super-admin/users - built as
 * {@link Specification}s rather than loading every user and filtering in
 * Java, so the query itself scopes rows and pagination stays accurate.
 * Each returns null when its filter is not requested, so
 * {@code Specification.allOf(...)} degrades to "no filter" cleanly.
 */
public final class UserSpecifications {

    private UserSpecifications() {
    }

    /** Case-insensitive substring match against name OR email. */
    public static Specification<User> search(String search) {

        if (search == null || search.isBlank()) {
            return null;
        }

        String pattern = "%" + search.trim().toLowerCase() + "%";

        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("name")), pattern),
                cb.like(cb.lower(root.get("email")), pattern));
    }

    /** Exact match against the user's Bambardara business role code. */
    public static Specification<User> hasRoleCode(String roleCode) {

        if (roleCode == null || roleCode.isBlank()) {
            return null;
        }

        return (root, query, cb) -> cb.equal(root.get("businessRole").get("code"), roleCode);
    }

    public static Specification<User> hasStatus(UserStatus status) {

        if (status == null) {
            return null;
        }

        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }
}
