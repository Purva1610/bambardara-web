package com.bambardara.demo.wellness.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.wellness.dto.SpaServiceResponse;
import com.bambardara.demo.wellness.entity.MassageType;
import com.bambardara.demo.wellness.entity.SpaService;
import com.bambardara.demo.wellness.exception.InvalidMassageTypeException;
import com.bambardara.demo.wellness.exception.SpaServiceNotFoundException;
import com.bambardara.demo.wellness.repository.SpaServiceRepository;

/**
 * Service for managing spa services.
 * 
 * Provides spa service listing, details, and massage type validation.
 */
@Service
public class SpaServiceService {

    private final SpaServiceRepository serviceRepository;

    public SpaServiceService(SpaServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    /**
     * Get all active spa services.
     * 
     * @return list of active services
     */
    @Transactional(readOnly = true)
    public List<SpaServiceResponse> getAllActiveServices() {
        return serviceRepository.findByIsActiveTrueOrderByMassageCategoryAscNameAsc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get spa service by ID.
     * 
     * @param id service ID
     * @return service details
     * @throws SpaServiceNotFoundException if not found
     */
    @Transactional(readOnly = true)
    public SpaServiceResponse getServiceById(Integer id) {
        SpaService service = serviceRepository.findById(id)
                .orElseThrow(() -> new SpaServiceNotFoundException(id));

        return mapToResponse(service);
    }

    /**
     * Get spa service entity by ID (internal use).
     * 
     * @param id service ID
     * @return service entity
     * @throws SpaServiceNotFoundException if not found
     */
    @Transactional(readOnly = true)
    public SpaService getServiceEntityById(Integer id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new SpaServiceNotFoundException(id));
    }

    /**
     * Validate that massage type matches its category.
     * 
     * MassageType enum already enforces this at the type level,
     * but this method provides explicit validation and error messaging.
     * 
     * @param service spa service
     * @throws InvalidMassageTypeException if massage type doesn't match category
     */
    public void validateMassageTypeCategory(SpaService service) {
        if (service.getMassageType() == null) {
            return; // Skip validation if no massage type
        }

        MassageType massageType = service.getMassageType();
        
        // MassageType enum already ensures category consistency
        // This validation is redundant but provides explicit checking
        if (!massageType.getCategory().equals(service.getMassageCategory())) {
            throw new InvalidMassageTypeException(
                    massageType,
                    service.getMassageCategory()
            );
        }
    }

    /**
     * Map entity to response DTO.
     */
    private SpaServiceResponse mapToResponse(SpaService service) {
        SpaServiceResponse response = new SpaServiceResponse();
        response.setId(service.getId());
        response.setMassageCategory(service.getMassageCategory());
        response.setMassageType(service.getMassageType());
        response.setName(service.getName());
        response.setDescription(service.getDescription());
        response.setPricePerSession(service.getPricePerSession());
        response.setDurationMinutes(service.getDurationMinutes());
        response.setIsActive(service.getIsActive());
        return response;
    }
}
