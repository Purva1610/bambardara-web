package com.bambardara.demo.contact.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.contact.dto.ContactRequestView;
import com.bambardara.demo.contact.entity.ConcernStatus;
import com.bambardara.demo.contact.entity.ContactRequest;
import com.bambardara.demo.contact.mapper.ContactRequestMapper;
import com.bambardara.demo.contact.repository.ContactRequestRepository;

@Service
@Transactional(readOnly = true)
public class ConcernQueryServiceImpl implements ConcernQueryService {

    private final ContactRequestRepository contactRequestRepository;
    private final ContactRequestMapper mapper;

    public ConcernQueryServiceImpl(
            ContactRequestRepository contactRequestRepository,
            ContactRequestMapper mapper) {

        this.contactRequestRepository = contactRequestRepository;
        this.mapper = mapper;
    }

    @Override
    public List<ContactRequestView> findForUser(User user) {

        return toViews(
                contactRequestRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
        );
    }

    @Override
    public List<ContactRequestView> findAll(ConcernStatus status) {

        return toViews(
                status == null
                        ? contactRequestRepository.findAllByOrderByCreatedAtDesc()
                        : contactRequestRepository.findByStatusOrderByCreatedAtDesc(status)
        );
    }

    private List<ContactRequestView> toViews(List<ContactRequest> concerns) {

        return concerns.stream()
                .map(mapper::toView)
                .toList();
    }
}
