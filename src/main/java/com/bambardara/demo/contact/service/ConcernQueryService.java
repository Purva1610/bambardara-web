package com.bambardara.demo.contact.service;

import java.util.List;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.contact.dto.ContactRequestView;
import com.bambardara.demo.contact.entity.ConcernStatus;

/**
 * Reads submitted concerns back.
 *
 * @see ConcernSubmissionService for why the read and write paths are separate.
 */
public interface ConcernQueryService {

    /**
     * The given user's own submissions, so the contact page can show a history
     * without exposing anyone else's concerns.
     */
    List<ContactRequestView> findForUser(User user);

    /**
     * Every concern, most recent first.
     *
     * @param status optional filter; null returns all statuses
     */
    List<ContactRequestView> findAll(ConcernStatus status);
}
