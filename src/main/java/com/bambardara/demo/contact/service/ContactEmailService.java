package com.bambardara.demo.contact.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.contact.entity.ContactRequest;
import com.bambardara.demo.contact.repository.ContactRequestRepository;

/**
 * Notifies the marketing team about a submitted concern.
 *
 * A separate bean from ContactService on purpose: {@code @Async} is applied by
 * a proxy, so a self-call from within ContactService would run on the caller's
 * thread and put the SMTP round trip back on the request.
 */
@Service
public class ContactEmailService {

    private static final Logger log = LoggerFactory.getLogger(ContactEmailService.class);

    private final JavaMailSender mailSender;
    private final ContactRequestRepository contactRequestRepository;

    private final String fromAddress;
    private final String[] marketingRecipients;

    public ContactEmailService(
            JavaMailSender mailSender,
            ContactRequestRepository contactRequestRepository,
            @Value("${app.mail.from}") String fromAddress,
            @Value("${app.mail.marketing-team}") String[] marketingRecipients) {

        this.mailSender = mailSender;
        this.contactRequestRepository = contactRequestRepository;
        this.fromAddress = fromAddress;
        this.marketingRecipients = marketingRecipients;
    }

    /**
     * Runs off the request thread, so a slow or unreachable SMTP server never
     * makes the user wait and never fails a concern that is already stored.
     *
     * Takes an id rather than the entity because the caller's persistence
     * context is gone by the time this runs.
     */
    @Async
    @Transactional
    public void sendConcernToMarketing(Integer concernId) {

        ContactRequest concern = contactRequestRepository.findById(concernId).orElse(null);

        if (concern == null) {

            log.warn("Contact request {} vanished before the marketing email was sent", concernId);
            return;
        }

        try {

            mailSender.send(buildMessage(concern));

            concern.setMarketingEmailSent(true);
            contactRequestRepository.save(concern);

        } catch (MailException e) {

            // Swallowed rather than rethrown: nothing is waiting on this thread
            // to catch it. The concern stays in the database with
            // marketingEmailSent = false, which is what the admin list shows.
            log.error("Failed to email marketing about contact request {}", concernId, e);
        }
    }

    private SimpleMailMessage buildMessage(ContactRequest concern) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(fromAddress);
        message.setTo(marketingRecipients);

        // Lets marketing hit Reply and land in the user's inbox instead of the
        // no-reply account the mail is sent from.
        message.setReplyTo(concern.getEmail());

        message.setSubject(
                "[Bambardara Concern #" + concern.getId() + "] "
                        + concern.getConcernType().name()
        );

        message.setText(
                (concern.getUser() == null
                        ? "A visitor submitted an enquiry through the public enquiry page (no account).\n\n"
                        : "A logged-in user submitted a concern through the contact page.\n\n")
                        + "Concern ID   : " + concern.getId() + "\n"
                        + "Type         : " + concern.getConcernType().name() + "\n"
                        + "Submitted at : " + concern.getCreatedAt() + "\n\n"
                        + "--- Contact details given on the form ---\n"
                        + "Name         : " + concern.getName() + "\n"
                        + "Email        : " + concern.getEmail() + "\n"
                        + "Mobile       : "
                        + (concern.getMobileNumber() == null ? "not provided" : concern.getMobileNumber())
                        + "\n\n"
                        + accountSection(concern)
                        + "--- Details ---\n"
                        + detailsSection(concern)
                        + "\n--- Message ---\n"
                        + concern.getMessage() + "\n"
        );

        return message;
    }

    private String accountSection(ContactRequest concern) {

        if (concern.getUser() == null) {
            return "";
        }

        return "--- Account it was submitted from ---\n"
                + "User ID      : " + concern.getUser().getId() + "\n"
                + "Account name : " + concern.getUser().getName() + "\n"
                + "Account email: " + concern.getUser().getEmail() + "\n\n";
    }

    private String detailsSection(ContactRequest concern) {

        if (concern.getDetails() == null || concern.getDetails().isEmpty()) {
            return "(none)\n";
        }

        StringBuilder sb = new StringBuilder();

        concern.getDetails().forEach((key, value) -> {
            if (value != null && !value.toString().isBlank()) {
                sb.append(key).append(": ").append(value).append("\n");
            }
        });

        return sb.length() == 0 ? "(none)\n" : sb.toString();
    }
}
