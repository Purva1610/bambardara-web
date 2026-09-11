package com.bambardara.demo.investment.repository;

import java.math.BigDecimal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bambardara.demo.investment.entity.Investment;
import com.bambardara.demo.investment.entity.InvestmentStatus;

public interface InvestmentRepository extends JpaRepository<Investment, Integer> {

    /**
     * Paginated investment list, filters all optional. Investor/round are
     * fetched eagerly so the list view never triggers N+1 queries.
     */
    @EntityGraph(attributePaths = { "investor", "fundingRound" })
    @Query("SELECT inv FROM Investment inv WHERE "
            + "(:investorId IS NULL OR inv.investor.id = :investorId) AND "
            + "(:fundingRoundId IS NULL OR inv.fundingRound.id = :fundingRoundId) AND "
            + "(:status IS NULL OR inv.status = :status) "
            + "ORDER BY inv.investedDate DESC")
    Page<Investment> search(
            @Param("investorId") Integer investorId,
            @Param("fundingRoundId") Integer fundingRoundId,
            @Param("status") InvestmentStatus status,
            Pageable pageable);

    /**
     * Total capital actually raised across every round - the CEO Overview's
     * "Investment Raised" figure. {@code COALESCE} so an empty table (or a
     * table with no ACTIVE rows) returns {@code 0}, never {@code null}.
     */
    @Query("SELECT COALESCE(SUM(inv.amount), 0) FROM Investment inv WHERE inv.status = 'ACTIVE'")
    BigDecimal sumActiveAmount();

    /**
     * Raised amount for one specific funding round - the Investments page's
     * per-round "% filled".
     */
    @Query("SELECT COALESCE(SUM(inv.amount), 0) FROM Investment inv "
            + "WHERE inv.fundingRound.id = :fundingRoundId AND inv.status = 'ACTIVE'")
    BigDecimal sumActiveAmountByFundingRound(@Param("fundingRoundId") Integer fundingRoundId);

    /**
     * Distinct investors with at least one ACTIVE commitment - the CEO
     * Overview's "Active Investors" count. Deliberately COUNT(DISTINCT ...),
     * not COUNT(*): one investor backing two rounds must count once.
     */
    @Query("SELECT COUNT(DISTINCT inv.investor.id) FROM Investment inv WHERE inv.status = 'ACTIVE'")
    long countDistinctActiveInvestors();
}
