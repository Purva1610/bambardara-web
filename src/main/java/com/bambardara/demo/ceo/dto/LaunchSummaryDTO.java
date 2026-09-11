package com.bambardara.demo.ceo.dto;

import java.time.LocalDate;

/**
 * "Days to Target Launch" for the CEO Overview page.
 *
 * {@code daysRemaining} is always computed server-side as
 * {@code ChronoUnit.DAYS.between(LocalDate.now(), targetLaunchDate)} - never
 * a stored counter. It is signed: negative once the target date has passed,
 * zero on the day itself, positive while still upcoming - the caller decides
 * how to present each case, this DTO does not hide the sign.
 *
 * Depends on a project's target launch date, which does not exist yet (no
 * {@code Project} entity), so this DTO is never currently constructed - see
 * {@link com.bambardara.demo.ceo.service.CeoDashboardService}.
 */
public class LaunchSummaryDTO {

    private LocalDate targetLaunchDate;
    private long daysRemaining;

    public LaunchSummaryDTO() {
    }

    public LaunchSummaryDTO(LocalDate targetLaunchDate, long daysRemaining) {
        this.targetLaunchDate = targetLaunchDate;
        this.daysRemaining = daysRemaining;
    }

    public LocalDate getTargetLaunchDate() {
        return targetLaunchDate;
    }

    public void setTargetLaunchDate(LocalDate targetLaunchDate) {
        this.targetLaunchDate = targetLaunchDate;
    }

    public long getDaysRemaining() {
        return daysRemaining;
    }

    public void setDaysRemaining(long daysRemaining) {
        this.daysRemaining = daysRemaining;
    }
}
