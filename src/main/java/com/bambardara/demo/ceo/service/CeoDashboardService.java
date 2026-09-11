package com.bambardara.demo.ceo.service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.bambardara.demo.ceo.dto.CeoDashboardResponse;
import com.bambardara.demo.ceo.dto.InvestmentSummaryDTO;
import com.bambardara.demo.investment.service.InvestmentService;

/**
 * Builds the CEO Overview read model by composing existing/new domain
 * services - see {@link com.bambardara.demo.ceo.dto.CeoDashboardResponse}.
 * Owns no repository of its own and never touches PostgreSQL directly.
 *
 * Current status: the Investment domain is now implemented ({@code Investor}/
 * {@code FundingRound}/{@code Investment}, via {@link InvestmentService}) and
 * feeds {@link CeoDashboardResponse#getInvestment()} with real, calculated
 * figures. The Construction domain ({@code Project}/{@code ProjectZone}/
 * {@code ZoneProgressUpdate}/{@code Milestone}) still does not exist in this
 * codebase (design-only so far - no entity, no table past migration V14).
 * Every section that depends on it is therefore left empty here, and
 * {@code "CONSTRUCTION"} remains in {@link CeoDashboardResponse#getUnavailableDomains()},
 * rather than this service fabricating figures. The calculation methods below
 * ({@link #calculateBudgetWeightedProgress} and
 * {@link #calculateDaysRemaining}) are implemented and unit-tested now so
 * that wiring in the Construction domain later is a matter of calling them
 * with real repository data, not writing new arithmetic.
 */
@Service
public class CeoDashboardService {

    private final InvestmentService investmentService;

    public CeoDashboardService(InvestmentService investmentService) {
        this.investmentService = investmentService;
    }

    public CeoDashboardResponse getDashboard() {

        List<String> unavailableDomains = new ArrayList<>();
        unavailableDomains.add("CONSTRUCTION");

        return new CeoDashboardResponse(
                buildInvestmentSummary(),
                null,               // construction - blocked on the Construction domain
                null,               // launch - blocked on Project.targetLaunchDate
                List.of(),          // projects - blocked on the Construction domain
                List.of(),          // budgetVsActual - blocked on the Construction domain
                List.of(),          // milestones - blocked on the Construction domain
                unavailableDomains
        );
    }

    private InvestmentSummaryDTO buildInvestmentSummary() {

        BigDecimal raised = investmentService.getTotalRaisedAmount();
        BigDecimal target = investmentService.getTotalTargetAmount();
        BigDecimal remaining = target.subtract(raised);
        BigDecimal percentRaised = calculatePercent(raised, target);

        return new InvestmentSummaryDTO(
                raised,
                target,
                remaining,
                percentRaised,
                investmentService.getActiveInvestorCount(),
                investmentService.getFundingRoundCount()
        );
    }

    /** Zero-division-safe percentage, scale 2 - same convention as InvestmentService. */
    private BigDecimal calculatePercent(BigDecimal numerator, BigDecimal denominator) {

        if (denominator == null || denominator.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }

        return numerator.divide(denominator, 4, RoundingMode.HALF_UP)
                .multiply(new BigDecimal("100"))
                .setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * Overall project progress as a budget-weighted average across zones:
     * {@code SUM(completionPercent * budgetAmount) / SUM(budgetAmount)}.
     * Matches the approved Construction design - never a simple unweighted
     * average across zones, and never an average of historical
     * {@code ZoneProgressUpdate} rows (only each zone's current state is
     * used).
     *
     * @param zones each zone's current completion % and current budget
     * @return the weighted average, scaled to 2 decimal places; {@code
     *         BigDecimal.ZERO} if {@code zones} is empty or every zone's
     *         budget is zero (division-by-zero is never allowed to reach
     *         the caller)
     */
    public BigDecimal calculateBudgetWeightedProgress(List<ZoneProgressSample> zones) {

        if (zones == null || zones.isEmpty()) {
            return BigDecimal.ZERO;
        }

        BigDecimal weightedSum = BigDecimal.ZERO;
        BigDecimal totalBudget = BigDecimal.ZERO;

        for (ZoneProgressSample zone : zones) {

            BigDecimal completionPercent = zone.completionPercent() != null
                    ? zone.completionPercent()
                    : BigDecimal.ZERO;

            BigDecimal budgetAmount = zone.budgetAmount() != null
                    ? zone.budgetAmount()
                    : BigDecimal.ZERO;

            weightedSum = weightedSum.add(completionPercent.multiply(budgetAmount));
            totalBudget = totalBudget.add(budgetAmount);
        }

        if (totalBudget.compareTo(BigDecimal.ZERO) == 0) {
            // Every zone has a zero (or unset) budget - a plain average would
            // silently misrepresent zones with real cost, but there is none
            // here to weight by. Zero is the honest answer, not a crash.
            return BigDecimal.ZERO;
        }

        return weightedSum.divide(totalBudget, new MathContext(10))
                .setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * Days remaining until a target date, computed against the current
     * server date - never stored, never client-supplied.
     *
     * @return positive while the target date is upcoming, zero on the
     *         target date itself, negative once it has passed
     */
    public long calculateDaysRemaining(LocalDate targetDate, LocalDate today) {

        return ChronoUnit.DAYS.between(today, targetDate);
    }

    /**
     * One zone's current state, as needed by {@link #calculateBudgetWeightedProgress}.
     * Deliberately not a DTO exposed via the API - just the two fields the
     * formula needs, decoupled from the (not-yet-existing) {@code ProjectZone}
     * entity so this calculation can be written and tested today.
     */
    public record ZoneProgressSample(BigDecimal completionPercent, BigDecimal budgetAmount) {
    }
}
