package com.bambardara.demo.ceo.dto;

import java.math.BigDecimal;

/**
 * Blended construction-progress figure for the CEO Overview page.
 *
 * {@code overallProgressPercent} is a budget-weighted average across
 * {@code ProjectZone} rows (SUM(completion_percent * budget_amount) /
 * SUM(budget_amount)), never a stored value and never an average of
 * {@code ZoneProgressUpdate} history rows - only each zone's current state
 * feeds this number.
 *
 * The Construction domain ({@code Project}/{@code ProjectZone}/
 * {@code ZoneProgressUpdate}) does not exist yet, so this DTO is never
 * currently constructed - see {@link com.bambardara.demo.ceo.service.CeoDashboardService}.
 */
public class ConstructionSummaryDTO {

    private BigDecimal overallProgressPercent;
    private long totalZones;

    public ConstructionSummaryDTO() {
    }

    public ConstructionSummaryDTO(BigDecimal overallProgressPercent, long totalZones) {
        this.overallProgressPercent = overallProgressPercent;
        this.totalZones = totalZones;
    }

    public BigDecimal getOverallProgressPercent() {
        return overallProgressPercent;
    }

    public void setOverallProgressPercent(BigDecimal overallProgressPercent) {
        this.overallProgressPercent = overallProgressPercent;
    }

    public long getTotalZones() {
        return totalZones;
    }

    public void setTotalZones(long totalZones) {
        this.totalZones = totalZones;
    }
}
