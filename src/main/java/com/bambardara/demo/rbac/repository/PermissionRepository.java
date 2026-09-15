package com.bambardara.demo.rbac.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bambardara.demo.rbac.entity.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Integer> {

    Optional<Permission> findByCode(String code);

    List<Permission> findByCodeIn(List<String> codes);

    /**
     * The full permission catalogue (see PermissionService), ordered so the
     * frontend can render Module -> permissions without re-sorting: by the
     * owning module's display order, then by permission code within it.
     * Eagerly fetches {@code module} to avoid N+1 selects while grouping.
     */
    @EntityGraph(attributePaths = "module")
    List<Permission> findAllByOrderByModule_DisplayOrderAscCodeAsc();
}
