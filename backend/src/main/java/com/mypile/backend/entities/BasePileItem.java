package com.mypile.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;


@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public class BasePileItem {
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    @Column(name = "image_url")
    private String imageUrl;
    private Double rating;
    private String genre;
    @Column(name = "external_id")
    private Long externalId;
    private LocalDateTime addedAt;

    @PrePersist
    protected void onCreate() {
        addedAt = LocalDateTime.now();
    }
}

