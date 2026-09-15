package com.bambardara.demo.rbac.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bambardara.demo.rbac.entity.Module;

public interface ModuleRepository extends JpaRepository<Module, Integer> {

    Optional<Module> findByCode(String code);

    List<Module> findAllByOrderByDisplayOrderAsc();
}
