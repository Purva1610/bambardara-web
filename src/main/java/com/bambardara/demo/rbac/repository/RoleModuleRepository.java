package com.bambardara.demo.rbac.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bambardara.demo.rbac.entity.RoleModule;

public interface RoleModuleRepository extends JpaRepository<RoleModule, Integer> {

    List<RoleModule> findByRoleId(Integer roleId);

    Optional<RoleModule> findByRoleIdAndModuleId(Integer roleId, Integer moduleId);

    List<RoleModule> findByRoleIdAndEnabledTrue(Integer roleId);
}
