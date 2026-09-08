package com.bambardara.demo.wellness.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.bambardara.demo.common.entity.BookingStatus;
import com.bambardara.demo.wellness.entity.MassageCategory;
import com.bambardara.demo.wellness.entity.MassageType;
import com.bambardara.demo.wellness.entity.TherapistPreference;

/**
 * Response DTO for spa appointment (user view).
 */
public class SpaAppointmentResponse {

    private Integer id;
    private Integer serviceId;
    private MassageCategory massageCategory;
    private MassageType massageType;
    private String serviceName;
    private String guestName;
    private String guestEmail;
    private String guestMobile;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private Integer durationMinutes;
    private TherapistPreference therapistPreference;
    private Integer numberOfPeople;
    private String specialRequest;
    private BookingStatus status;
    private BigDecimal totalAmount;
    private LocalDateTime createdAt;

    public SpaAppointmentResponse() {
    }

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public MassageCategory getMassageCategory() {
        return massageCategory;
    }

    public void setMassageCategory(MassageCategory massageCategory) {
        this.massageCategory = massageCategory;
    }

    public MassageType getMassageType() {
        return massageType;
    }

    public void setMassageType(MassageType massageType) {
        this.massageType = massageType;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getGuestName() {
        return guestName;
    }

    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }

    public String getGuestEmail() {
        return guestEmail;
    }

    public void setGuestEmail(String guestEmail) {
        this.guestEmail = guestEmail;
    }

    public String getGuestMobile() {
        return guestMobile;
    }

    public void setGuestMobile(String guestMobile) {
        this.guestMobile = guestMobile;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public LocalTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public TherapistPreference getTherapistPreference() {
        return therapistPreference;
    }

    public void setTherapistPreference(TherapistPreference therapistPreference) {
        this.therapistPreference = therapistPreference;
    }

    public Integer getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public String getSpecialRequest() {
        return specialRequest;
    }

    public void setSpecialRequest(String specialRequest) {
        this.specialRequest = specialRequest;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
