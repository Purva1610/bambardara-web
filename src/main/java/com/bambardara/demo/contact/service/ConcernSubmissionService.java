package com.bambardara.demo.contact.service;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.contact.dto.ContactFormRequest;
import com.bambardara.demo.contact.dto.ContactResponse;

/**
 * Accepts a concern from a signed-in user.
 *
 * Split from {@link ConcernQueryService} because recording a concern and
 * reading concerns back change for unrelated reasons: the write path moves when
 * notification or intake rules change, the read path when the admin screens do.
 */
public interface ConcernSubmissionService {

    /**
     * @param user the account the concern is filed under, taken from the
     *             credential rather than from the request body
     */
    ContactResponse submit(User user, ContactFormRequest request);
}
