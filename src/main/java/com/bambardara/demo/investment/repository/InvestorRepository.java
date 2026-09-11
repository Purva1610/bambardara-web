package com.bambardara.demo.investment.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bambardara.demo.investment.entity.Investor;
import com.bambardara.demo.investment.entity.InvestmentStatus;

/**
 * Four concrete derived-query methods, one per combination of the investor
 * register's two optional filters (name search, status), rather than one
 * JPQL query with {@code :param IS NULL OR ...} branching.
 *
 * A single "(:q IS NULL OR LOWER(name) LIKE LOWER(CONCAT('%',:q,'%')))"
 * query was tried first and rejected: when {@code :q} is bound null,
 * PostgreSQL/the JDBC driver cannot infer a type for it inside
 * CONCAT/LOWER and defaults to {@code bytea}, failing with "function
 * lower(bytea) does not exist". Casting the parameter in JPQL
 * ({@code CAST(:q AS string)}) does make that specific query work, but it's
 * a workaround for the query shape, not a fix of it - every method here
 * only ever receives concrete, non-null arguments, so the failure mode
 * can't occur in the first place. {@link com.bambardara.demo.investment.service.InvestmentService#listInvestors}
 * picks the right one, the same branch-by-filter-presence pattern already
 * used by {@link com.bambardara.demo.contact.controller.AdminContactController#getContactsPaginated}.
 */
public interface InvestorRepository extends JpaRepository<Investor, Integer> {

    Page<Investor> findByNameContainingIgnoreCaseAndStatus(String q, InvestmentStatus status, Pageable pageable);

    Page<Investor> findByNameContainingIgnoreCase(String q, Pageable pageable);

    Page<Investor> findByStatus(InvestmentStatus status, Pageable pageable);

    // findAll(Pageable) - no filters at all - is already provided by JpaRepository.
}
