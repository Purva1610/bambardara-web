package com.bambardara.demo.ceo.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.investment.dto.CreateInvestorRequest;
import com.bambardara.demo.investment.dto.FundingRoundResponse;
import com.bambardara.demo.investment.dto.InvestmentResponse;
import com.bambardara.demo.investment.dto.InvestorResponse;
import com.bambardara.demo.investment.entity.InvestmentStatus;
import com.bambardara.demo.investment.service.InvestmentService;

import jakarta.validation.Valid;

import java.util.List;

/**
 * CEO-facing read/create views over the Investment domain. All business
 * logic and validation lives in {@link InvestmentService} - this class only
 * translates HTTP requests into service calls and maps pagination
 * parameters.
 *
 * Access: {@code ROLE_CEO}, enforced both by SecurityConfig's
 * {@code /api/ceo/**} matcher and here (matching the existing ADMIN/CEO
 * convention). Deliberately checks {@code hasRole('CEO')} only, not
 * {@code hasAnyRole('CEO','ADMIN')} - an ADMIN token must not automatically
 * see investment data.
 *
 * Future RBAC: once a Permission-based model exists, these read endpoints
 * are the natural home for an {@code INVESTMENT_VIEW} permission check and
 * {@link #createInvestor} for {@code INVESTMENT_MANAGE}, replacing the flat
 * role check below without changing the URL contract.
 */
@RestController
@RequestMapping("/api/ceo")
@PreAuthorize("hasRole('CEO')")
public class CeoInvestmentController {

    private final InvestmentService investmentService;

    public CeoInvestmentController(InvestmentService investmentService) {
        this.investmentService = investmentService;
    }

    @GetMapping("/funding-rounds")
    public ResponseEntity<List<FundingRoundResponse>> getFundingRounds() {

        return ResponseEntity.ok(investmentService.listFundingRounds());
    }

    @GetMapping("/investors")
    public ResponseEntity<Page<InvestorResponse>> getInvestors(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) InvestmentStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(
                Math.max(page, 0),
                clampSize(size),
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        return ResponseEntity.ok(investmentService.listInvestors(q, status, pageable));
    }

    @PostMapping("/investors")
    public ResponseEntity<InvestorResponse> createInvestor(
            @Valid @RequestBody CreateInvestorRequest request) {

        InvestorResponse response = investmentService.createInvestor(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/investments")
    public ResponseEntity<Page<InvestmentResponse>> getInvestments(
            @RequestParam(required = false) Integer investorId,
            @RequestParam(required = false) Integer fundingRoundId,
            @RequestParam(required = false) InvestmentStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(Math.max(page, 0), clampSize(size));

        return ResponseEntity.ok(
                investmentService.listInvestments(investorId, fundingRoundId, status, pageable));
    }

    // Same 1-100 bound already used by AdminContactController's
    // /paginated endpoint - kept consistent rather than inventing a new cap.
    private int clampSize(int size) {
        return (size < 1 || size > 100) ? 20 : size;
    }
}
