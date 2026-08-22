package com.bambardara.demo.contact.notification;

import org.springframework.stereotype.Component;

import com.bambardara.demo.contact.entity.ContactRequest;

/**
 * Turns a concern into the wording of a notification email.
 *
 * Deliberately knows nothing about addressing or SMTP: how the mail reads is
 * the part marketing will keep asking to change, and keeping it free of I/O
 * means it can be asserted on directly in a test.
 */
@Component
public class ConcernEmailComposer {

    public String subjectFor(ContactRequest concern) {

        return "[Bambardara Concern #" + concern.getId() + "] "
                + concern.getConcernType().name();
    }

    public String bodyFor(ContactRequest concern) {

        StringBuilder body = new StringBuilder();
        
        body.append("A concern was submitted through the contact page.\n\n");
        body.append("Concern ID   : ").append(concern.getId()).append("\n");
        body.append("Type         : ").append(concern.getConcernType().name()).append("\n");
        body.append("Submitted at : ").append(concern.getCreatedAt()).append("\n\n");
        
        body.append("--- Contact details given on the form ---\n");
        body.append("Name         : ").append(concern.getName()).append("\n");
        body.append("Email        : ").append(concern.getEmail()).append("\n");
        body.append("Mobile       : ");
        body.append(concern.getMobileNumber() == null ? "not provided" : concern.getMobileNumber());
        body.append("\n\n");
        
        // Handle anonymous submissions (user may be null)
        if (concern.getUser() != null) {
            body.append("--- Account it was submitted from ---\n");
            body.append("User ID      : ").append(concern.getUser().getId()).append("\n");
            body.append("Account name : ").append(concern.getUser().getName()).append("\n");
            body.append("Account email: ").append(concern.getUser().getEmail()).append("\n\n");
        } else {
            body.append("--- Submission type ---\n");
            body.append("Anonymous submission (no account)\n\n");
        }
        
        body.append("--- Message ---\n");
        body.append(concern.getMessage()).append("\n");
        
        return body.toString();
    }
}
