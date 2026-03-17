package com.mypile.backend.entities;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class GamePileItem extends BasePileItem {
    private Integer metacritic;
    private LocalDate releaseDate;
    private String platforms;
}
