package com.bambardara.demo.ceo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;

import com.bambardara.demo.ceo.dto.CeoDashboardResponse;
import com.bambardara.demo.ceo.service.CeoDashboardService;
import com.bambardara.demo.ceo.service.CeoDashboardService.ZoneProgressSample;
import com.bambardara.demo.investment.service.InvestmentService;

/**
 * Pure unit tests - no Spring context, no database. Covers the calculation
 * formulas in isolation and confirms the dashboard response never carries a
 * fabricated business figure while the Construction domain is missing (the
 * Investment domain now exists and is exercised via a mocked
 * {@link InvestmentService}).
 */
class CeoDashboardServiceTest {

    private final InvestmentService investmentService = mock(InvestmentService.class);
    private final CeoDashboardService service = new CeoDashboardService(investmentService);

    // --- getDashboard(): real Investment data, honest-empty Construction ---

    @Test
    void dashboard_populatesInvestmentFromRealDomain_andReportsOnlyConstructionAsUnavailable() {

        when(investmentService.getTotalRaisedAmount()).thenReturn(new BigDecimal("5000000.00"));
        when(investmentService.getTotalTargetAmount()).thenReturn(new BigDecimal("20000000.00"));
        when(investmentService.getActiveInvestorCount()).thenReturn(3L);
        when(investmentService.getFundingRoundCount()).thenReturn(3L);

        CeoDashboardResponse response = service.getDashboard();

        assertNotNull(response.getInvestment(), "investment must be populated - the domain now exists");
        assertEquals(0, new BigDecimal("5000000.00").compareTo(response.getInvestment().getRaisedAmount()));
        assertEquals(0, new BigDecimal("15000000.00").compareTo(response.getInvestment().getRemainingAmount()));
        assertEquals(0, new BigDecimal("25.00").compareTo(response.getInvestment().getPercentRaised()));
        assertEquals(3L, response.getInvestment().getActiveInvestorCount());

        assertNull(response.getConstruction(), "construction must stay null, not a fabricated summary");
        assertNull(response.getLaunch(), "launch must stay null - no Project.targetLaunchDate exists yet");
        assertTrue(response.getProjects().isEmpty());
        assertTrue(response.getBudgetVsActual().isEmpty());
        assertTrue(response.getMilestones().isEmpty());
        assertFalse(response.getUnavailableDomains().contains("INVESTMENT"),
                "INVESTMENT must no longer be reported unavailable - the domain is implemented");
        assertTrue(response.getUnavailableDomains().contains("CONSTRUCTION"));
    }

    @Test
    void dashboard_zeroFundingTarget_doesNotDivideByZero() {

        when(investmentService.getTotalRaisedAmount()).thenReturn(BigDecimal.ZERO);
        when(investmentService.getTotalTargetAmount()).thenReturn(BigDecimal.ZERO);
        when(investmentService.getActiveInvestorCount()).thenReturn(0L);
        when(investmentService.getFundingRoundCount()).thenReturn(0L);

        CeoDashboardResponse response = service.getDashboard();

        assertEquals(0, BigDecimal.ZERO.compareTo(response.getInvestment().getPercentRaised()));
    }

    // --- calculateBudgetWeightedProgress ------------------------------

    @Test
    void weightedProgress_emptyZoneList_returnsZero_notException() {

        assertEquals(0, BigDecimal.ZERO.compareTo(service.calculateBudgetWeightedProgress(List.of())));
    }

    @Test
    void weightedProgress_nullZoneList_returnsZero() {

        assertEquals(0, BigDecimal.ZERO.compareTo(service.calculateBudgetWeightedProgress(null)));
    }

    @Test
    void weightedProgress_allZeroBudgets_returnsZero_doesNotDivideByZero() {

        List<ZoneProgressSample> zones = List.of(
                new ZoneProgressSample(new BigDecimal("50"), BigDecimal.ZERO),
                new ZoneProgressSample(new BigDecimal("80"), BigDecimal.ZERO)
        );

        assertEquals(0, BigDecimal.ZERO.compareTo(service.calculateBudgetWeightedProgress(zones)));
    }

    @Test
    void weightedProgress_singleZone_equalsThatZonesPercent() {

        List<ZoneProgressSample> zones = List.of(
                new ZoneProgressSample(new BigDecimal("55"), new BigDecimal("1900000"))
        );

        assertEquals(0, new BigDecimal("55.00").compareTo(service.calculateBudgetWeightedProgress(zones)));
    }

    @Test
    void weightedProgress_multipleZones_isBudgetWeighted_notSimpleAverage() {

        // Zone A: 100% complete, small budget (10). Zone B: 0% complete, large budget (90).
        // Simple average would be 50%; budget-weighted must be close to 10%.
        List<ZoneProgressSample> zones = List.of(
                new ZoneProgressSample(new BigDecimal("100"), new BigDecimal("10")),
                new ZoneProgressSample(new BigDecimal("0"), new BigDecimal("90"))
        );

        BigDecimal result = service.calculateBudgetWeightedProgress(zones);

        assertEquals(0, new BigDecimal("10.00").compareTo(result));
    }

    // --- calculateDaysRemaining ----------------------------------------

    @Test
    void daysRemaining_futureDate_isPositive() {

        LocalDate today = LocalDate.of(2026, 1, 1);
        LocalDate target = LocalDate.of(2026, 1, 11);

        assertEquals(10, service.calculateDaysRemaining(target, today));
    }

    @Test
    void daysRemaining_today_isZero() {

        LocalDate today = LocalDate.of(2026, 1, 1);

        assertEquals(0, service.calculateDaysRemaining(today, today));
    }

    @Test
    void daysRemaining_pastDate_isNegative() {

        LocalDate today = LocalDate.of(2026, 1, 11);
        LocalDate target = LocalDate.of(2026, 1, 1);

        assertEquals(-10, service.calculateDaysRemaining(target, today));
    }
}
