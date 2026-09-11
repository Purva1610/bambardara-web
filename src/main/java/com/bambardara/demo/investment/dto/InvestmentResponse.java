package com.bambardara.demo.investment.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.bambardara.demo.investment.entity.InvestmentStatus;

public class InvestmentResponse {

    private Integer id;
    private Integer investorId;
    private String investorName;
    private Integer fundingRoundId;
    private String fundingRoundCode;
    private BigDecimal amount;
    private BigDecimal stakePercent;
    private LocalDate investedDate;
    private InvestmentStatus status;

    public InvestmentResponse() {
    }

    public InvestmentResponse(
            Integer id,
            Integer investorId,
            String investorName,
            Integer fundingRoundId,
            String fundingRoundCode,
            BigDecimal amount,
            BigDecimal stakePercent,
            LocalDate investedDate,
            InvestmentStatus status) {

        this.id = id;
        this.investorId = investorId;
        this.investorName = investorName;
        this.fundingRoundId = fundingRoundId;
        this.fundingRoundCode = fundingRoundCode;
        this.amount = amount;
        this.stakePercent = stakePercent;
        this.investedDate = investedDate;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getInvestorId() {
        return investorId;
    }

    public void setInvestorId(Integer investorId) {
        this.investorId = investorId;
    }

    public String getInvestorName() {
        return investorName;
    }

    public void setInvestorName(String investorName) {
        this.investorName = investorName;
    }

    public Integer getFundingRoundId() {
        return fundingRoundId;
    }

    public void setFundingRoundId(Integer fundingRoundId) {
        this.fundingRoundId = fundingRoundId;
    }

    public String getFundingRoundCode() {
        return fundingRoundCode;
    }

    public void setFundingRoundCode(String fundingRoundCode) {
        this.fundingRoundCode = fundingRoundCode;
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
}
