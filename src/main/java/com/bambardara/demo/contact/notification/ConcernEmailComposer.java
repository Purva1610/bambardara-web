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

        return "A logged-in user submitted a concern through the contact page.\n\n"
                + "Concern ID   : " + concern.getId() + "\n"
                + "Type         : " + concern.getConcernType().name() + "\n"
                + "Submitted at : " + concern.getCreatedAt() + "\n\n"
                + "--- Contact details given on the form ---\n"
                + "Name         : " + concern.getName() + "\n"
                + "Email        : " + concern.getEmail() + "\n"
                + "Mobile       : "
                + (concern.getMobileNumber() == null ? "not provided" : concern.getMobileNumber())
                + "\n\n"
                + "--- Account it was submitted from ---\n"
                + "User ID      : " + concern.getUser().getId() + "\n"
                + "Account name : " + concern.getUser().getName() + "\n"
                + "Account email: " + concern.getUser().getEmail() + "\n\n"
                + "--- Message ---\n"
                + concern.getMessage() + "\n";
    }
}
