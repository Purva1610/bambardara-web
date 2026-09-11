package com.bambardara.demo.investment.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.investment.dto.CreateInvestorRequest;
import com.bambardara.demo.investment.dto.FundingRoundResponse;
import com.bambardara.demo.investment.dto.InvestmentResponse;
import com.bambardara.demo.investment.dto.InvestorResponse;
import com.bambardara.demo.investment.entity.FundingRound;
import com.bambardara.demo.investment.entity.Investment;
import com.bambardara.demo.investment.entity.InvestmentStatus;
import com.bambardara.demo.investment.entity.Investor;
import com.bambardara.demo.investment.exception.FundingRoundNotFoundException;
import com.bambardara.demo.investment.exception.InvestorNotFoundException;
import com.bambardara.demo.investment.repository.FundingRoundRepository;
import com.bambardara.demo.investment.repository.InvestmentRepository;
import com.bambardara.demo.investment.repository.InvestorRepository;

/**
 * Owns all Investment-domain business logic (creation rules, referential
 * integrity, aggregation). {@code CeoInvestmentController} and
 * {@code CeoDashboardService} both call into this - neither talks to a
 * repository directly.
 */
@Service
public class InvestmentService {

    private final InvestorRepository investorRepository;
    private final FundingRoundRepository fundingRoundRepository;
    private final InvestmentRepository investmentRepository;

    public InvestmentService(
            InvestorRepository investorRepository,
            FundingRoundRepository fundingRoundRepository,
            InvestmentRepository investmentRepository) {

        this.investorRepository = investorRepository;
        this.fundingRoundRepository = fundingRoundRepository;
        this.investmentRepository = investmentRepository;
    }

    // ========== Investor ==========

    @Transactional
    public InvestorResponse createInvestor(CreateInvestorRequest request) {

        InvestmentStatus status = request.getStatus() != null
                ? InvestmentStatus.valueOf(request.getStatus().toUpperCase())
                : InvestmentStatus.ACTIVE;

        Investor investor = new Investor(
                request.getName(),
                request.getEmail(),
                request.getPhone(),
                request.getOrganization(),
                status
        );

        investor = investorRepository.save(investor);

        return toInvestorResponse(investor);
    }

    @Transactional(readOnly = true)
    public Page<InvestorResponse> listInvestors(String q, InvestmentStatus status, Pageable pageable) {

        String search = blankToNull(q);

        Page<Investor> page;

        if (search != null && status != null) {
            page = investorRepository.findByNameContainingIgnoreCaseAndStatus(search, status, pageable);
        } else if (search != null) {
            page = investorRepository.findByNameContainingIgnoreCase(search, pageable);
        } else if (status != null) {
            page = investorRepository.findByStatus(status, pageable);
        } else {
            page = investorRepository.findAll(pageable);
        }

        return page.map(this::toInvestorResponse);
    }

    // ========== FundingRound ==========

    @Transactional(readOnly = true)
    public List<FundingRoundResponse> listFundingRounds() {

        return fundingRoundRepository.findAllByOrderByStartDateAsc().stream()
                .map(this::toFundingRoundResponse)
                .collect(Collectors.toList());
    }

    // ========== Investment ==========

    @Transactional(readOnly = true)
    public Page<InvestmentResponse> listInvestments(
            Integer investorId, Integer fundingRoundId, InvestmentStatus status, Pageable pageable) {

        return investmentRepository.search(investorId, fundingRoundId, status, pageable)
                .map(this::toInvestmentResponse);
    }

    /**
     * Records a new investment. Not yet exposed via a public endpoint (only
     * the four read/create-investor APIs in this slice are) - kept as a
     * real, independently callable/testable method so the business rules
     * (rules 1-5, 8-10 of the Investment slice spec) can be enforced and
     * verified now, ready for a future {@code POST /api/ceo/investments}.
     *
     * @throws InvestorNotFoundException     if investorId does not exist
     * @throws FundingRoundNotFoundException if fundingRoundId does not exist
     * @throws IllegalArgumentException      if amount is not positive, or
     *                                       stakePercent is outside 0-100
     */
    @Transactional
    public InvestmentResponse createInvestment(
            Integer investorId,
            Integer fundingRoundId,
            BigDecimal amount,
            BigDecimal stakePercent,
            LocalDate investedDate,
            InvestmentStatus status) {

        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Investment amount must be positive");
        }

        if (stakePercent != null
                && (stakePercent.compareTo(BigDecimal.ZERO) < 0 || stakePercent.compareTo(new BigDecimal("100")) > 0)) {
            throw new IllegalArgumentException("Stake percent must be between 0 and 100");
        }

        Investor investor = investorRepository.findById(investorId)
                .orElseThrow(() -> new InvestorNotFoundException("Investor not found with id: " + investorId));

        FundingRound fundingRound = fundingRoundRepository.findById(fundingRoundId)
                .orElseThrow(() -> new FundingRoundNotFoundException("Funding round not found with id: " + fundingRoundId));

        Investment investment = new Investment(
                investor,
                fundingRound,
                amount,
                stakePercent,
                investedDate,
                status != null ? status : InvestmentStatus.ACTIVE
        );

        investment = investmentRepository.save(investment);

        return toInvestmentResponse(investment);
    }

    // ========== Aggregates (consumed by CeoDashboardService) ==========

    @Transactional(readOnly = true)
    public BigDecimal getTotalRaisedAmount() {
        return investmentRepository.sumActiveAmount();
    }

    @Transactional(readOnly = true)
    public BigDecimal getTotalTargetAmount() {
        return fundingRoundRepository.findAll().stream()
                .map(FundingRound::getTargetAmount)
                .filter(java.util.Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Transactional(readOnly = true)
    public long getActiveInvestorCount() {
        return investmentRepository.countDistinctActiveInvestors();
    }

    @Transactional(readOnly = true)
    public long getFundingRoundCount() {
        return fundingRoundRepository.count();
    }

    // ========== Mapping ==========

    private InvestorResponse toInvestorResponse(Investor investor) {
        return new InvestorResponse(
                investor.getId(),
                investor.getName(),
                investor.getEmail(),
                investor.getPhone(),
                investor.getOrganization(),
                investor.getStatus(),
                investor.getCreatedAt(),
                investor.getUpdatedAt()
        );
    }

    private FundingRoundResponse toFundingRoundResponse(FundingRound round) {

        BigDecimal raised = investmentRepository.sumActiveAmountByFundingRound(round.getId());
        BigDecimal percentFilled = calculatePercent(raised, round.getTargetAmount());

        return new FundingRoundResponse(
                round.getId(),
                round.getName(),
                round.getCode(),
                round.getTargetAmount(),
                raised,
                percentFilled,
                round.getStatus(),
                round.getStartDate(),
                round.getEndDate()
        );
    }

    private InvestmentResponse toInvestmentResponse(Investment investment) {
        return new InvestmentResponse(
                investment.getId(),
                investment.getInvestor().getId(),
                investment.getInvestor().getName(),
                investment.getFundingRound().getId(),
                investment.getFundingRound().getCode(),
                investment.getAmount(),
                investment.getStakePercent(),
                investment.getInvestedDate(),
                investment.getStatus()
        );
    }

    /** Zero-division-safe percentage, scale 2. */
    private BigDecimal calculatePercent(BigDecimal numerator, BigDecimal denominator) {

        if (denominator == null || denominator.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }

        return numerator.divide(denominator, 4, RoundingMode.HALF_UP)
                .multiply(new BigDecimal("100"))
                .setScale(2, RoundingMode.HALF_UP);
    }

    private String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value.trim();
    }
}
