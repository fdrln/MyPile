package com.mypile.backend.repository;

import com.mypile.backend.entities.GamePileItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GamePileRepository extends JpaRepository<GamePileItem, Long> {
}