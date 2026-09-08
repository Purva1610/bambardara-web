package com.bambardara.demo.wellness.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bambardara.demo.common.entity.BookingStatus;
import com.bambardara.demo.wellness.entity.SpaAppointment;

/**
 * Repository for spa appointments.
 * 
 * Includes availability checking queries.
 */
public interface SpaAppointmentRepository extends JpaRepository<SpaAppointment, Integer> {

    /**
     * Find all appointments for a user.
     */
    List<SpaAppointment> findByUserIdOrderByCreatedAtDesc(Integer userId);

    /**
     * Find appointments by status.
     */
    List<SpaAppointment> findByStatusOrderByCreatedAtDesc(BookingStatus status);

    /**
     * Find all appointments ordered by creation date descending.
     */
    List<SpaAppointment> findAllByOrderByCreatedAtDesc();

    /**
     * Find all appointments ordered by appointment date descending.
     */
    List<SpaAppointment> findAllByOrderByAppointmentDateDesc();

    /**
     * Find appointments by status, ordered by appointment date descending.
     */
    List<SpaAppointment> findByStatusOrderByAppointmentDateDesc(BookingStatus status);

    /**
     * Find all appointments for a specific service and date (for availability checking).
     * Only considers active statuses (PENDING, CONFIRMED).
     * 
     * @param serviceId service ID
     * @param appointmentDate date
     * @param statuses statuses to consider
     * @return list of appointments
     */
    @Query("SELECT a FROM SpaAppointment a WHERE a.service.id = :serviceId " +
           "AND a.appointmentDate = :date " +
           "AND a.status IN :statuses " +
           "ORDER BY a.appointmentTime")
    List<SpaAppointment> findAppointmentsByServiceAndDate(
            @Param("serviceId") Integer serviceId,
            @Param("date") LocalDate appointmentDate,
            @Param("statuses") List<BookingStatus> statuses
    );

    /**
     * Check for conflicting appointments at exact time slot.
     * Used to prevent double-booking same resource/time.
     * 
     * @param serviceId service ID
     * @param appointmentDate date
     * @param appointmentTime time
     * @param statuses active statuses
     * @return list of conflicting appointments (empty if available)
     */
    @Query("SELECT a FROM SpaAppointment a WHERE a.service.id = :serviceId " +
           "AND a.appointmentDate = :date " +
           "AND a.appointmentTime = :time " +
           "AND a.status IN :statuses")
    List<SpaAppointment> findConflictingAppointments(
            @Param("serviceId") Integer serviceId,
            @Param("date") LocalDate appointmentDate,
            @Param("time") LocalTime appointmentTime,
            @Param("statuses") List<BookingStatus> statuses
    );
}
