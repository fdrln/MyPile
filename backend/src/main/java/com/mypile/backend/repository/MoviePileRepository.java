package com.mypile.backend.repository;

import com.mypile.backend.entities.MoviePileItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoviePileRepository extends JpaRepository<MoviePileItem, Long> {
    boolean existsByExternalId(Long externalId);
}