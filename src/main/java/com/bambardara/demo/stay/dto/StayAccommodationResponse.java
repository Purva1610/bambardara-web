package com.bambardara.demo.stay.dto;

import java.math.BigDecimal;
import java.util.Map;

import com.bambardara.demo.stay.entity.AccommodationType;

/**
 * Response DTO for stay accommodation (public view).
 */
public class StayAccommodationResponse {

    private Integer id;
    private AccommodationType accommodationType;
    private String name;
    private String description;
    private BigDecimal pricePerNight;
    private Integer maxGuests;
    private Map<String, Object> amenities;
    private Boolean isActive;

    public StayAccommodationResponse() {
    }

    public StayAccommodationResponse(
            Integer id,
            AccommodationType accommodationType,
            String name,
            String description,
            BigDecimal pricePerNight,
            Integer maxGuests,
            Map<String, Object> amenities,
            Boolean isActive) {
        this.id = id;
        this.accommodationType = accommodationType;
        this.name = name;
        this.description = description;
        this.pricePerNight = pricePerNight;
        this.maxGuests = maxGuests;
        this.amenities = amenities;
        this.isActive = isActive;
    }

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public AccommodationType getAccommodationType() {
        return accommodationType;
    }

    public void setAccommodationType(AccommodationType accommodationType) {
        this.accommodationType = accommodationType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPricePerNight() {
        return pricePerNight;
    }

    public void setPricePerNight(BigDecimal pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public Integer getMaxGuests() {
        return maxGuests;
    }

    public void setMaxGuests(Integer maxGuests) {
        this.maxGuests = maxGuests;
    }

    public Map<String, Object> getAmenities() {
        return amenities;
    }

    public void setAmenities(Map<String, Object> amenities) {
        this.amenities = amenities;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
