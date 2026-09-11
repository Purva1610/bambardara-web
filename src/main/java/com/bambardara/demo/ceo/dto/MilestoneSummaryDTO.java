package com.bambardara.demo.ceo.dto;

import java.time.LocalDate;

/**
 * One row of the Overview page's milestone panels ("Milestone Status",
 * "Upcoming Milestones").
 *
 * Depends on the Construction domain's {@code Milestone} entity, which does
 * not exist yet, so no instance of this DTO is currently ever constructed.
 */
public class MilestoneSummaryDTO {

    private String title;
    private LocalDate dueDate;
    private String status;

    public MilestoneSummaryDTO() {
    }

    public MilestoneSummaryDTO(String title, LocalDate dueDate, String status) {
        this.title = title;
        this.dueDate = dueDate;
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
