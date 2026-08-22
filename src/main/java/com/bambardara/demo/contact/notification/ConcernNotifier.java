package com.bambardara.demo.contact.notification;

/**
 * Tells whoever handles concerns that a new one has arrived.
 *
 * The submission service depends on this rather than on an email class, so
 * adding a Slack or SMS channel means adding an implementation instead of
 * editing the intake path.
 */
public interface ConcernNotifier {

    /**
     * Takes an id rather than the entity: implementations are free to run
     * asynchronously, by which point the caller's persistence context is gone.
     * Callers must have committed the row before calling this.
     */
    void notifyOf(Integer concernId);
}
