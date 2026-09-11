package com.bambardara.demo.ceo.dto;

import java.math.BigDecimal;

/**
 * One row of the Overview page's "Project Progress Overview" panel.
 *
 * Depends on the Construction domain ({@code Project}), which does not
 * exist yet, so no instance of this DTO is currently ever constructed.
 */
public class ProjectSummaryDTO {

    private Integer id;
    private String name;
    private BigDecimal progressPercent;

    public ProjectSummaryDTO() {
    }

    public ProjectSummaryDTO(Integer id, String name, BigDecimal progressPercent) {
        this.id = id;
        this.name = name;
        this.progressPercent = progressPercent;
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

    public BigDecimal getProgressPercent() {
        return progressPercent;
    }

    public void setProgressPercent(BigDecimal progressPercent) {
        this.progressPercent = progressPercent;
    }
}
