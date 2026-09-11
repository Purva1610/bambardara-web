package com.bambardara.demo.investment.entity;

/**
 * Standing of an investor overall, or of one specific investment commitment.
 * Shared by {@link Investor#getStatus()} and {@link Investment#getStatus()} -
 * the two are independent signals (an investor can be ACTIVE overall while
 * one particular past commitment was WITHDRAWN), but draw from the same
 * vocabulary, so one enum is used rather than two identical ones.
 */
public enum InvestmentStatus {

    /** Confirmed and in good standing. */
    ACTIVE,

    /** Terms agreed but paperwork/compliance not yet finalized. */
    UNDER_DOCS,

    /** Withdrawn or cancelled. Terminal. */
    WITHDRAWN
}
