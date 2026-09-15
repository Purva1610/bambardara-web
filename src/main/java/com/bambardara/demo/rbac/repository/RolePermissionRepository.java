package com.bambardara.demo.rbac.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bambardara.demo.rbac.entity.RolePermission;

public interface RolePermissionRepository extends JpaRepository<RolePermission, Integer> {

    List<RolePermission> findByRoleId(Integer roleId);

    Optional<RolePermission> findByRoleIdAndPermissionId(Integer roleId, Integer permissionId);

    void deleteByRoleIdAndPermissionId(Integer roleId, Integer permissionId);
}
