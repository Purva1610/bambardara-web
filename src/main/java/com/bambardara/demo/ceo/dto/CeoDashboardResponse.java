package com.bambardara.demo.ceo.dto;

import java.util.List;

/**
 * Response for {@code GET /api/ceo/dashboard} - the read-model aggregate
 * behind the CEO Overview page.
 *
 * Every section is sourced from an existing business domain
 * ({@link com.bambardara.demo.ceo.service.CeoDashboardService} composes
 * this, never queries anything itself); nothing here is stored by a CEO
 * dashboard table of its own.
 *
 * A section whose backing domain does not exist yet in this codebase is
 * left {@code null} (or an empty list) rather than populated with invented
 * numbers - {@link #unavailableDomains} names exactly which domains are
 * missing, so a caller can tell "genuinely zero" apart from "not
 * implemented yet" instead of guessing from a null.
 */
public class CeoDashboardResponse {

    private InvestmentSummaryDTO investment;
    private ConstructionSummaryDTO construction;
    private LaunchSummaryDTO launch;
    private List<ProjectSummaryDTO> projects;
    private List<BudgetVsActualDTO> budgetVsActual;
    private List<MilestoneSummaryDTO> milestones;
    private List<String> unavailableDomains;

    public CeoDashboardResponse() {
    }

    public CeoDashboardResponse(
            InvestmentSummaryDTO investment,
            ConstructionSummaryDTO construction,
            LaunchSummaryDTO launch,
            List<ProjectSummaryDTO> projects,
            List<BudgetVsActualDTO> budgetVsActual,
            List<MilestoneSummaryDTO> milestones,
            List<String> unavailableDomains) {

        this.investment = investment;
        this.construction = construction;
        this.launch = launch;
        this.projects = projects;
        this.budgetVsActual = budgetVsActual;
        this.milestones = milestones;
        this.unavailableDomains = unavailableDomains;
    }

    public InvestmentSummaryDTO getInvestment() {
        return investment;
    }

    public void setInvestment(InvestmentSummaryDTO investment) {
        this.investment = investment;
    }

    public ConstructionSummaryDTO getConstruction() {
        return construction;
    }

    public void setConstruction(ConstructionSummaryDTO construction) {
        this.construction = construction;
    }

    public LaunchSummaryDTO getLaunch() {
        return launch;
    }

    public void setLaunch(LaunchSummaryDTO launch) {
        this.launch = launch;
    }

    public List<ProjectSummaryDTO> getProjects() {
        return projects;
    }

    public void setProjects(List<ProjectSummaryDTO> projects) {
        this.projects = projects;
    }

    public List<BudgetVsActualDTO> getBudgetVsActual() {
        return budgetVsActual;
    }

    public void setBudgetVsActual(List<BudgetVsActualDTO> budgetVsActual) {
        this.budgetVsActual = budgetVsActual;
    }

    public List<MilestoneSummaryDTO> getMilestones() {
        return milestones;
    }

    public void setMilestones(List<MilestoneSummaryDTO> milestones) {
        this.milestones = milestones;
    }

    public List<String> getUnavailableDomains() {
        return unavailableDomains;
    }

    public void setUnavailableDomains(List<String> unavailableDomains) {
        this.unavailableDomains = unavailableDomains;
    }
}
