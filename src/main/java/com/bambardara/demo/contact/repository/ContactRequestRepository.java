package com.bambardara.demo.contact.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bambardara.demo.contact.entity.ConcernStatus;
import com.bambardara.demo.contact.entity.ContactRequest;

public interface ContactRequestRepository extends JpaRepository<ContactRequest, Integer> {

    // The admin list shows the submitting account, so fetch the user in the
    // same query instead of one extra SELECT per row.
    @EntityGraph(attributePaths = "user")
    List<ContactRequest> findAllByOrderByCreatedAtDesc();

    @EntityGraph(attributePaths = "user")
    List<ContactRequest> findByStatusOrderByCreatedAtDesc(ConcernStatus status);

    @EntityGraph(attributePaths = "user")
    List<ContactRequest> findByUserIdOrderByCreatedAtDesc(Integer userId);
}
