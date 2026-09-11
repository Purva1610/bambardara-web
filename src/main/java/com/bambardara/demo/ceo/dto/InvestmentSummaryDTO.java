package com.bambardara.demo.ceo.dto;

import java.math.BigDecimal;

/**
 * Funding/investment figures for the CEO Overview page (frontend's
 * {@code fundingSummary}: raised, target, investors, and the derived
 * progress bar percentage).
 *
 * Every field here is only ever populated from real {@code Investment}/
 * {@code FundingRound} rows - that domain does not exist yet (no entity, no
 * table beyond migration V13), so {@link com.bambardara.demo.ceo.service.CeoDashboardService}
 * currently never constructs one of these; {@code CeoDashboardResponse.investment}
 * stays {@code null} and {@code "INVESTMENT"} appears in
 * {@code CeoDashboardResponse.unavailableDomains} instead.
 */
public class InvestmentSummaryDTO {

    private BigDecimal raisedAmount;
    private BigDecimal targetAmount;
    private BigDecimal remainingAmount;
    private BigDecimal percentRaised;
    private long activeInvestorCount;
    private long fundingRoundCount;

    public InvestmentSummaryDTO() {
    }

    public InvestmentSummaryDTO(
            BigDecimal raisedAmount,
            BigDecimal targetAmount,
            BigDecimal remainingAmount,
            BigDecimal percentRaised,
            long activeInvestorCount,
            long fundingRoundCount) {

        this.raisedAmount = raisedAmount;
        this.targetAmount = targetAmount;
        this.remainingAmount = remainingAmount;
        this.percentRaised = percentRaised;
        this.activeInvestorCount = activeInvestorCount;
        this.fundingRoundCount = fundingRoundCount;
    }

    public BigDecimal getRaisedAmount() {
        return raisedAmount;
    }

    public void setRaisedAmount(BigDecimal raisedAmount) {
        this.raisedAmount = raisedAmount;
    }

    public BigDecimal getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(BigDecimal targetAmount) {
        this.targetAmount = targetAmount;
    }

    public BigDecimal getRemainingAmount() {
        return remainingAmount;
    }

    public void setRemainingAmount(BigDecimal remainingAmount) {
        this.remainingAmount = remainingAmount;
    }

    public BigDecimal getPercentRaised() {
        return percentRaised;
    }

    public void setPercentRaised(BigDecimal percentRaised) {
        this.percentRaised = percentRaised;
    }

    public long getActiveInvestorCount() {
        return activeInvestorCount;
    }

    public void setActiveInvestorCount(long activeInvestorCount) {
        this.activeInvestorCount = activeInvestorCount;
    }

    public long getFundingRoundCount() {
        return fundingRoundCount;
    }

    public void setFundingRoundCount(long fundingRoundCount) {
        this.fundingRoundCount = fundingRoundCount;
    }
}
