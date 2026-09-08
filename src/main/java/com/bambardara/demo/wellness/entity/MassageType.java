package com.bambardara.demo.wellness.entity;

/**
 * Types of massage services with category validation.
 * 
 * Each massage type is associated with a specific category and cannot
 * be mixed with incorrect categories (enforced at enum level).
 * 
 * Usage:
 * - MassageType.SWEDISH.getCategory() → MassageCategory.COMMON_SPA
 * - MassageType.ABHYANGA.getCategory() → MassageCategory.TRADITIONAL
 */
public enum MassageType {
    // Common Spa Massages
    SWEDISH(MassageCategory.COMMON_SPA, "Swedish Massage"),
    DEEP_TISSUE(MassageCategory.COMMON_SPA, "Deep Tissue Massage"),
    HOT_STONE(MassageCategory.COMMON_SPA, "Hot Stone Massage"),
    AROMATHERAPY(MassageCategory.COMMON_SPA, "Aromatherapy Massage"),
    SPORTS(MassageCategory.COMMON_SPA, "Sports Massage"),
    
    // Traditional Ayurvedic Massages
    ABHYANGA(MassageCategory.TRADITIONAL, "Abhyanga (Full Body Oil Massage)"),
    SHIRODHARA(MassageCategory.TRADITIONAL, "Shirodhara (Oil Flow Therapy)"),
    UDWARTANA(MassageCategory.TRADITIONAL, "Udwartana (Herbal Powder Massage)"),
    MARMA(MassageCategory.TRADITIONAL, "Marma (Pressure Point Therapy)"),
    PIZHICHIL(MassageCategory.TRADITIONAL, "Pizhichil (Oil Bath Therapy)");

    private final MassageCategory category;
    private final String displayName;

    MassageType(MassageCategory category, String displayName) {
        this.category = category;
        this.displayName = displayName;
    }

    /**
     * Get the category this massage type belongs to.
     * 
     * @return massage category (COMMON_SPA or TRADITIONAL)
     */
    public MassageCategory getCategory() {
        return category;
    }

    /**
     * Get human-readable display name.
     * 
     * @return display name
     */
    public String getDisplayName() {
        return displayName;
    }

    /**
     * Validate that this massage type belongs to the specified category.
     * 
     * @param expectedCategory category to validate against
     * @return true if massage type matches category
     */
    public boolean belongsToCategory(MassageCategory expectedCategory) {
        return this.category == expectedCategory;
    }

    /**
     * Validate massage type and category combination.
     * Throws exception if mismatch.
     * 
     * @param massageType massage type
     * @param category category
     * @throws IllegalArgumentException if combination is invalid
     */
    public static void validateCombination(MassageType massageType, MassageCategory category) {
        if (!massageType.belongsToCategory(category)) {
            throw new IllegalArgumentException(
                    String.format("Invalid combination: %s does not belong to category %s. " +
                                  "Correct category is %s",
                            massageType, category, massageType.getCategory())
            );
        }
    }
}
