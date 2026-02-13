package com.example.skillsh.domain.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "blocks", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"blocker_username", "blocked_username"})
})
public class Block {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "blocker_username", nullable = false)
    private String blockerUsername;

    @Column(name = "blocked_username", nullable = false)
    private String blockedUsername;

    @Column(name = "blocked_at", nullable = false)
    private LocalDateTime blockedAt = LocalDateTime.now();

    // Constructors
    public Block() {}

    public Block(String blockerUsername, String blockedUsername) {
        this.blockerUsername = blockerUsername;
        this.blockedUsername = blockedUsername;
        this.blockedAt = LocalDateTime.now();
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getBlockerUsername() {
        return blockerUsername;
    }

    public void setBlockerUsername(String blockerUsername) {
        this.blockerUsername = blockerUsername;
    }

    public String getBlockedUsername() {
        return blockedUsername;
    }

    public void setBlockedUsername(String blockedUsername) {
        this.blockedUsername = blockedUsername;
    }

    public LocalDateTime getBlockedAt() {
        return blockedAt;
    }

    public void setBlockedAt(LocalDateTime blockedAt) {
        this.blockedAt = blockedAt;
    }
}
