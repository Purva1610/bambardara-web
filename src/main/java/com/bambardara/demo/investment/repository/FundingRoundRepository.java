package com.bambardara.demo.investment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bambardara.demo.investment.entity.FundingRound;

public interface FundingRoundRepository extends JpaRepository<FundingRound, Integer> {

    List<FundingRound> findAllByOrderByStartDateAsc();

    boolean existsByCode(String code);
}
