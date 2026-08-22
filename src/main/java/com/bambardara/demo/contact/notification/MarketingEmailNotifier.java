package com.bambardara.demo.contact.notification;

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
 * Emails the marketing team about a new concern.
 *
 * Owns delivery only - addressing, transport, and recording the outcome. The
 * wording lives in {@link ConcernEmailComposer}.
 *
 * A separate bean from the submission service on purpose: {@code @Async} is
 * applied by a proxy, so a self-call from within that service would run on the
 * caller's thread and put the SMTP round trip back on the request.
 */
@Service
public class MarketingEmailNotifier implements ConcernNotifier {

    private static final Logger log = LoggerFactory.getLogger(MarketingEmailNotifier.class);

    private final JavaMailSender mailSender;
    private final ContactRequestRepository contactRequestRepository;
    private final ConcernEmailComposer composer;

    private final String fromAddress;
    private final String[] marketingRecipients;

    public MarketingEmailNotifier(
            JavaMailSender mailSender,
            ContactRequestRepository contactRequestRepository,
            ConcernEmailComposer composer,
            @Value("${app.mail.from}") String fromAddress,
            @Value("${app.mail.marketing-team}") String[] marketingRecipients) {

        this.mailSender = mailSender;
        this.contactRequestRepository = contactRequestRepository;
        this.composer = composer;
        this.fromAddress = fromAddress;
        this.marketingRecipients = marketingRecipients;
    }

    /**
     * Runs off the request thread, so a slow or unreachable SMTP server never
     * makes the user wait and never fails a concern that is already stored.
     */
    @Async
    @Transactional
    @Override
    public void notifyOf(Integer concernId) {

        ContactRequest concern = contactRequestRepository.findById(concernId).orElse(null);

        if (concern == null) {

            log.warn("Contact request {} vanished before the marketing email was sent", concernId);
            return;
        }

        try {

            mailSender.send(addressed(concern));

            concern.setMarketingEmailSent(true);
            contactRequestRepository.save(concern);

        } catch (MailException e) {

            // Swallowed rather than rethrown: nothing is waiting on this thread
            // to catch it. The concern stays in the database with
            // marketingEmailSent = false, which is what the admin list shows.
            log.error("Failed to email marketing about contact request {}", concernId, e);
        }
    }

    private SimpleMailMessage addressed(ContactRequest concern) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(fromAddress);
        message.setTo(marketingRecipients);

        // Lets marketing hit Reply and land in the user's inbox instead of the
        // no-reply account the mail is sent from.
        message.setReplyTo(concern.getEmail());

        message.setSubject(composer.subjectFor(concern));
        message.setText(composer.bodyFor(concern));

        return message;
    }
}
