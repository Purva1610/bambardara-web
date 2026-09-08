package com.bambardara.demo.wellness.entity;

/**
 * Categories of spa massage services.
 * 
 * Each massage type belongs to exactly one category.
 * Categories help organize and validate massage offerings.
 */
public enum MassageCategory {
    /**
     * Common spa massages (Western-style therapeutic massages).
     * Includes: Swedish, Deep Tissue, Hot Stone, Aromatherapy, Sports.
     */
    COMMON_SPA,
    
    /**
     * Traditional Ayurvedic/Indian massages.
     * Includes: Abhyanga, Shirodhara, Udwartana, Marma, Pizhichil.
     */
    TRADITIONAL
}
