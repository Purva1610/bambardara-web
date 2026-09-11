package com.bambardara.demo.investment.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.bambardara.demo.investment.entity.FundingRoundStatus;

/**
 * {@code raisedAmount} and {@code percentFilled} are always computed from
 * this round's {@code Investment} rows at read time (see
 * InvestmentService) - never a column on {@code FundingRound} itself.
 */
public class FundingRoundResponse {

    private Integer id;
    private String name;
    private String code;
    private BigDecimal targetAmount;
    private BigDecimal raisedAmount;
    private BigDecimal percentFilled;
    private FundingRoundStatus status;
    private LocalDate startDate;
    private LocalDate endDate;

    public FundingRoundResponse() {
    }

    public FundingRoundResponse(
            Integer id,
            String name,
            String code,
            BigDecimal targetAmount,
            BigDecimal raisedAmount,
            BigDecimal percentFilled,
            FundingRoundStatus status,
            LocalDate startDate,
            LocalDate endDate) {

        this.id = id;
        this.name = name;
        this.code = code;
        this.targetAmount = targetAmount;
        this.raisedAmount = raisedAmount;
        this.percentFilled = percentFilled;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public BigDecimal getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(BigDecimal targetAmount) {
        this.targetAmount = targetAmount;
    }

    public BigDecimal getRaisedAmount() {
        return raisedAmount;
    }

    public void setRaisedAmount(BigDecimal raisedAmount) {
        this.raisedAmount = raisedAmount;
    }

    public BigDecimal getPercentFilled() {
        return percentFilled;
    }

    public void setPercentFilled(BigDecimal percentFilled) {
        this.percentFilled = percentFilled;
    }

    public FundingRoundStatus getStatus() {
        return status;
    }

    public void setStatus(FundingRoundStatus status) {
        this.status = status;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
