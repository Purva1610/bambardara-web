package com.bambardara.demo.investment;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.investment.dto.CreateInvestorRequest;
import com.bambardara.demo.investment.dto.FundingRoundResponse;
import com.bambardara.demo.investment.dto.InvestmentResponse;
import com.bambardara.demo.investment.dto.InvestorResponse;
import com.bambardara.demo.investment.entity.InvestmentStatus;
import com.bambardara.demo.investment.exception.FundingRoundNotFoundException;
import com.bambardara.demo.investment.exception.InvestorNotFoundException;
import com.bambardara.demo.investment.repository.FundingRoundRepository;
import com.bambardara.demo.investment.service.InvestmentService;

/**
 * Full-context tests against the real (local, Postgres) database - exercises
 * referential integrity, validation, and pagination as they actually behave
 * with Flyway-migrated tables, not mocks. Each test runs inside a
 * transaction that is rolled back afterward, so the V14-seeded funding
 * rounds and any created rows never leak between tests.
 */
@SpringBootTest
@Transactional
class InvestmentServiceTest {

    @Autowired
    private InvestmentService investmentService;

    @Autowired
    private FundingRoundRepository fundingRoundRepository;

    // --- Investor creation --------------------------------------------

    @Test
    void createInvestor_persistsAndReturnsInvestor() {

        CreateInvestorRequest request = new CreateInvestorRequest();
        request.setName("Kolhapur Agro Fund");
        request.setEmail("contact@kolhapuragro.example");
        request.setPhone("9876543210");
        request.setOrganization("Kolhapur Agro Fund LLP");

        InvestorResponse response = investmentService.createInvestor(request);

        assertEquals("Kolhapur Agro Fund", response.getName());
        assertEquals("contact@kolhapuragro.example", response.getEmail());
        assertEquals(InvestmentStatus.ACTIVE, response.getStatus(), "status defaults to ACTIVE when not supplied");
        assertTrue(response.getId() != null && response.getId() > 0, "a persisted row must have a generated id");
    }

    @Test
    void createInvestor_explicitStatus_isRespected() {

        CreateInvestorRequest request = new CreateInvestorRequest();
        request.setName("Gulf Ventures LLC");
        request.setStatus("UNDER_DOCS");

        InvestorResponse response = investmentService.createInvestor(request);

        assertEquals(InvestmentStatus.UNDER_DOCS, response.getStatus());
    }

    // --- Pagination ------------------------------------------------------

    @Test
    void listInvestors_pagination_returnsRequestedPageSize() {

        for (int i = 0; i < 5; i++) {
            CreateInvestorRequest request = new CreateInvestorRequest();
            request.setName("Pagination Investor " + i);
            investmentService.createInvestor(request);
        }

        Page<InvestorResponse> firstPage = investmentService.listInvestors(null, null, PageRequest.of(0, 2));

        assertEquals(2, firstPage.getContent().size());
        assertTrue(firstPage.getTotalElements() >= 5);
    }

    @Test
    void listInvestors_searchByName_filtersResults() {

        CreateInvestorRequest request = new CreateInvestorRequest();
        request.setName("Unique Search Target Investor");
        investmentService.createInvestor(request);

        Page<InvestorResponse> results = investmentService.listInvestors(
                "Unique Search Target", null, PageRequest.of(0, 10));

        assertEquals(1, results.getTotalElements());
        assertEquals("Unique Search Target Investor", results.getContent().get(0).getName());
    }

    // --- Referential integrity (business rules 3 & 4) ---------------------

    @Test
    void createInvestment_nonexistentInvestor_throwsInvestorNotFound() {

        Integer realRoundId = fundingRoundRepository.findAll().get(0).getId();

        assertThrows(InvestorNotFoundException.class, () -> investmentService.createInvestment(
                999999, realRoundId, new BigDecimal("1000000"), null, LocalDate.now(), InvestmentStatus.ACTIVE));
    }

    @Test
    void createInvestment_nonexistentFundingRound_throwsFundingRoundNotFound() {

        Integer realInvestorId = createInvestor("Referential Check Investor").getId();

        assertThrows(FundingRoundNotFoundException.class, () -> investmentService.createInvestment(
                realInvestorId, 999999, new BigDecimal("1000000"), null, LocalDate.now(), InvestmentStatus.ACTIVE));
    }

    // --- Business rule 1 & 10: amount must be positive ---------------------

    @Test
    void createInvestment_zeroAmount_throwsIllegalArgument() {

        Integer investorId = createInvestor("Zero Amount Investor").getId();
        Integer roundId = fundingRoundRepository.findAll().get(0).getId();

        assertThrows(IllegalArgumentException.class, () -> investmentService.createInvestment(
                investorId, roundId, BigDecimal.ZERO, null, LocalDate.now(), InvestmentStatus.ACTIVE));
    }

    @Test
    void createInvestment_negativeAmount_throwsIllegalArgument() {

        Integer investorId = createInvestor("Negative Amount Investor").getId();
        Integer roundId = fundingRoundRepository.findAll().get(0).getId();

        assertThrows(IllegalArgumentException.class, () -> investmentService.createInvestment(
                investorId, roundId, new BigDecimal("-500"), null, LocalDate.now(), InvestmentStatus.ACTIVE));
    }

    // --- Business rule 2: stakePercent must be valid ---------------------

    @Test
    void createInvestment_stakePercentOver100_throwsIllegalArgument() {

        Integer investorId = createInvestor("Bad Stake Investor").getId();
        Integer roundId = fundingRoundRepository.findAll().get(0).getId();

        assertThrows(IllegalArgumentException.class, () -> investmentService.createInvestment(
                investorId, roundId, new BigDecimal("1000000"), new BigDecimal("150"), LocalDate.now(), InvestmentStatus.ACTIVE));
    }

    // --- Happy path + BigDecimal usage (business rules 6 & 7) -------------

    @Test
    void createInvestment_validRequest_succeeds_andUsesBigDecimalThroughout() {

        Integer investorId = createInvestor("Valid Investment Investor").getId();
        Integer roundId = fundingRoundRepository.findAll().get(0).getId();

        InvestmentResponse response = investmentService.createInvestment(
                investorId, roundId, new BigDecimal("2500000.00"), new BigDecimal("4.25"),
                LocalDate.of(2026, 6, 15), InvestmentStatus.ACTIVE);

        assertInstanceOf(BigDecimal.class, response.getAmount());
        assertInstanceOf(BigDecimal.class, response.getStakePercent());
        assertEquals(0, new BigDecimal("2500000.00").compareTo(response.getAmount()));
        assertEquals(0, new BigDecimal("4.25").compareTo(response.getStakePercent()));
    }

    @Test
    void fundingRoundResponse_raisedAmountAndPercent_areBigDecimal_andReflectRealInvestments() {

        Integer investorId = createInvestor("Round Aggregate Investor").getId();
        Integer roundId = fundingRoundRepository.findAll().get(0).getId();

        investmentService.createInvestment(
                investorId, roundId, new BigDecimal("1000000.00"), null, LocalDate.now(), InvestmentStatus.ACTIVE);

        List<FundingRoundResponse> rounds = investmentService.listFundingRounds();
        FundingRoundResponse target = rounds.stream()
                .filter(r -> r.getId().equals(roundId))
                .findFirst()
                .orElseThrow();

        assertInstanceOf(BigDecimal.class, target.getRaisedAmount());
        assertInstanceOf(BigDecimal.class, target.getPercentFilled());
        assertTrue(target.getRaisedAmount().compareTo(BigDecimal.ZERO) > 0,
                "raisedAmount must reflect the investment just created, not be stored/stale");
    }

    // --- Dashboard aggregate helpers used by CeoDashboardService ----------

    @Test
    void aggregateHelpers_zeroInvestments_doNotThrow() {

        // On a fresh transaction with no investments committed yet, these
        // must return 0/empty, never null or an exception.
        BigDecimal raised = investmentService.getTotalRaisedAmount();
        long investors = investmentService.getActiveInvestorCount();

        assertInstanceOf(BigDecimal.class, raised);
        assertTrue(investors >= 0);
    }

    private InvestorResponse createInvestor(String name) {
        CreateInvestorRequest request = new CreateInvestorRequest();
        request.setName(name);
        return investmentService.createInvestor(request);
    }
}
