package com.bambardara.demo.ceo.dto;

import java.math.BigDecimal;

/**
 * One row of the Overview page's "Budget vs Actual" chart.
 *
 * Sourced from {@code ProjectZone.budgetAmount}/{@code spentAmount} in the
 * approved Construction design - never a separate expense ledger (no
 * {@code ProjectExpense} entity exists or is planned for this granularity).
 * The Construction domain does not exist yet, so no instance of this DTO is
 * currently ever constructed.
 */
public class BudgetVsActualDTO {

    private String projectName;
    private BigDecimal budgetAmount;
    private BigDecimal actualAmount;

    public BudgetVsActualDTO() {
    }

    public BudgetVsActualDTO(String projectName, BigDecimal budgetAmount, BigDecimal actualAmount) {
        this.projectName = projectName;
        this.budgetAmount = budgetAmount;
        this.actualAmount = actualAmount;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public BigDecimal getBudgetAmount() {
        return budgetAmount;
    }

    public void setBudgetAmount(BigDecimal budgetAmount) {
        this.budgetAmount = budgetAmount;
    }

    public BigDecimal getActualAmount() {
        return actualAmount;
    }

    public void setActualAmount(BigDecimal actualAmount) {
        this.actualAmount = actualAmount;
    }
}
