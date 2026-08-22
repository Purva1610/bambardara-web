package com.bambardara.demo.auth.config;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

/**
 * Firebase Admin SDK configuration.
 * 
 * Initializes Firebase on application startup. Supports two configuration modes:
 * 
 * 1. Service Account JSON file path (recommended for local development)
 *    Set: FIREBASE_SERVICE_ACCOUNT_PATH=/path/to/serviceAccountKey.json
 * 
 * 2. Service Account JSON content as environment variable (recommended for production/Docker)
 *    Set: FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
 * 
 * The Firebase Admin SDK is used to verify Firebase ID tokens sent from the React frontend.
 */
@Configuration
public class FirebaseConfig {

    private static final Logger logger = LoggerFactory.getLogger(FirebaseConfig.class);

    @Value("${firebase.service-account.path:#{null}}")
    private String serviceAccountPath;

    @Value("${firebase.service-account.json:#{null}}")
    private String serviceAccountJson;

    @Bean
    public FirebaseApp initializeFirebase() throws IOException {

        if (FirebaseApp.getApps().isEmpty()) {

            try {
                FirebaseOptions options = buildFirebaseOptions();
                FirebaseApp app = FirebaseApp.initializeApp(options);
                logger.info("Firebase Admin SDK initialized successfully");
                return app;
            } catch (IllegalStateException e) {
                // Allow application to start without Firebase for testing
                logger.warn("Firebase configuration missing - running without Firebase authentication");
                logger.warn("Authentication will fail until Firebase is configured");
                return null;
            }

        } else {

            logger.info("Firebase Admin SDK already initialized");
            return FirebaseApp.getInstance();
        }
    }

    private FirebaseOptions buildFirebaseOptions() throws IOException {

        GoogleCredentials credentials;

        // Priority 1: JSON content from environment variable (production/Docker)
        if (serviceAccountJson != null && !serviceAccountJson.trim().isEmpty()) {

            logger.info("Initializing Firebase from service account JSON content");

            InputStream serviceAccountStream = new ByteArrayInputStream(
                    serviceAccountJson.getBytes(StandardCharsets.UTF_8)
            );

            credentials = GoogleCredentials.fromStream(serviceAccountStream);

        }
        // Priority 2: JSON file path (local development)
        else if (serviceAccountPath != null && !serviceAccountPath.trim().isEmpty()) {

            logger.info("Initializing Firebase from service account file: {}", serviceAccountPath);

            InputStream serviceAccountStream = new FileInputStream(serviceAccountPath);

            credentials = GoogleCredentials.fromStream(serviceAccountStream);

        }
        // No configuration provided
        else {

            throw new IllegalStateException(
                    "Firebase configuration missing. Set either:\n" +
                    "  - FIREBASE_SERVICE_ACCOUNT_PATH (file path), or\n" +
                    "  - FIREBASE_SERVICE_ACCOUNT_JSON (JSON content)\n" +
                    "See application.properties for details."
            );
        }

        return FirebaseOptions.builder()
                .setCredentials(credentials)
                .build();
    }
}
