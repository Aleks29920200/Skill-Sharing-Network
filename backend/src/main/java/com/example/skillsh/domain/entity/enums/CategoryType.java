package com.example.skillsh.domain.entity.enums;

public enum CategoryType {
    IT("IT", "#34ce57"),
    MEDICINE("Medicine", "#6f42c1"),
    ARCHAEOLOGY("Archaeology", "#20c997"),
    ENGINEERING("Engineering", "#ffc107"),
    EDUCATION("Education", "#fd7e14"),
    LAW("Law", "#dc3545"),
    ART("Art", "#6610f2"),
    SCIENCE("Science", "#17a2b8"),
    BUSINESS("Business", "#007bff"),
    FINANCE("Finance", "#28a745"),
    MATHEMATICS("Mathematics", "#6f42c1"),
    PSYCHOLOGY("Psychology", "#e83e8c"),
    ARCHITECTURE("Architecture", "#20c997"),
    AGRICULTURE("Agriculture", "#17a2b8"),
    SPORTS("Sports", "#fd7e14"),
    MEDIA("Media", "#6f42c1"),
    MUSIC("Music", "#6610f2"),
    PHILOSOPHY("Philosophy", "#e83e8c"),
    HISTORY("History", "#007bff"),
    LINGUISTICS("Linguistics", "#28a745"),
    ENVIRONMENT("Environment", "#20c997"),
    ASTRONOMY("Astronomy", "#6f42c1"),
    GEOLOGY("Geology", "#fd7e14"),
    BIOLOGY("Biology", "#34ce57"),
    CHEMISTRY("Chemistry", "#ffc107"),
    PHYSICS("Physics", "#dc3545"),
    ECONOMICS("Economics", "#007bff"),
    SOCIOLOGY("Sociology", "#17a2b8"),
    POLITICS("Politics", "#6f42c1"),
    TRANSPORTATION("Transportation", "#20c997");

    private final String displayName;
    private final String color;

    CategoryType(String displayName, String color) {
        this.displayName = displayName;
        this.color = color;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getColor() {
        return color;
    }
}
