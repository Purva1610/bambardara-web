package com.bambardara.demo.contact.mapper;

import org.springframework.stereotype.Component;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.contact.dto.ContactFormRequest;
import com.bambardara.demo.contact.dto.ContactRequestView;
import com.bambardara.demo.contact.entity.ConcernType;
import com.bambardara.demo.contact.entity.ContactRequest;

/**
 * Translates between {@link ContactRequest} and its DTOs.
 *
 * Kept out of both sides: a DTO that knows how to build itself from an entity
 * drags the persistence model into the API layer, and a service that does the
 * field-by-field copying stops being about orchestration. Changing the shape of
 * the wire format now touches only this class.
 */
@Component
public class ContactRequestMapper {

    public ContactRequest toEntity(User user, ContactFormRequest request) {

        return new ContactRequest(
                user,
                request.getName().trim(),
                request.getEmail().trim(),
                normaliseMobile(request.getMobileNumber()),
                // Safe by the time we get here: @EnumValue on the DTO has
                // already rejected anything that is not a constant name.
                ConcernType.valueOf(request.getConcernType()),
                request.getDetails(),
                request.getMessage().trim()
        );
    }

    public ContactRequestView toView(ContactRequest concern) {

        return new ContactRequestView(
                concern.getId(),
                concern.getName(),
                concern.getEmail(),
                concern.getMobileNumber(),
                concern.getConcernType().name(),
                concern.getDetails(),
                concern.getMessage(),
                concern.getStatus().name(),
                concern.isMarketingEmailSent(),
                concern.getCreatedAt(),
                concern.getUser().getId(),
                concern.getUser().getEmail()
        );
    }

    /**
     * The form leaves the optional mobile field as "" rather than omitting it,
     * so collapse blanks to null and keep the column meaningfully empty.
     */
    private String normaliseMobile(String mobileNumber) {

        if (mobileNumber == null || mobileNumber.isBlank()) {

            return null;
        }

        return mobileNumber.trim();
    }
}
