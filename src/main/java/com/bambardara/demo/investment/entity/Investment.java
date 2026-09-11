package com.bambardara.demo.investment.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

/**
 * One investor's capital commitment to one funding round.
 *
 * The join between {@link Investor} and {@link FundingRound}: an investor
 * who backs multiple rounds has one row per round, not one row total.
 *
 * SECURITY: amount/stakePercent are always server-validated (positive
 * amount, 0-100 stake) - never trusted from a client-calculated value.
 */
@Entity
@Table(name = "investments")
public class Investment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "investor_id", nullable = false)
    private Investor investor;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "funding_round_id", nullable = false)
    private FundingRound fundingRound;

    @Column(nullable = false, precision = 14, scale = 2)
    private BigDecimal amount;

    // Nullable: not every commitment has an equity stake finalized yet
    // (e.g. while still UNDER_DOCS).
    @Column(name = "stake_percent", precision = 5, scale = 2)
    private BigDecimal stakePercent;

    @Column(name = "invested_date", nullable = false)
    private LocalDate investedDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private InvestmentStatus status = InvestmentStatus.ACTIVE;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Investment() {
    }

    public Investment(Investor investor, FundingRound fundingRound, BigDecimal amount,
                       BigDecimal stakePercent, LocalDate investedDate, InvestmentStatus status) {
        this.investor = investor;
        this.fundingRound = fundingRound;
        this.amount = amount;
        this.stakePercent = stakePercent;
        this.investedDate = investedDate;
        this.status = status;
    }

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = InvestmentStatus.ACTIVE;
        }
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Investor getInvestor() {
        return investor;
    }

    public void setInvestor(Investor investor) {
        this.investor = investor;
    }

    public FundingRound getFundingRound() {
        return fundingRound;
    }

    public void setFundingRound(FundingRound fundingRound) {
        this.fundingRound = fundingRound;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getStakePercent() {
        return stakePercent;
    }

    public void setStakePercent(BigDecimal stakePercent) {
        this.stakePercent = stakePercent;
    }

    public LocalDate getInvestedDate() {
        return investedDate;
    }

    public void setInvestedDate(LocalDate investedDate) {
        this.investedDate = investedDate;
    }

    public InvestmentStatus getStatus() {
        return status;
    }

    public void setStatus(InvestmentStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
