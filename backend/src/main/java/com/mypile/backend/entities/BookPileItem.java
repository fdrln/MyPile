package com.mypile.backend.entities;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class BookPileItem extends BasePileItem {
    private String author;
    private String publishYear;
    private String openLibraryKey;
}