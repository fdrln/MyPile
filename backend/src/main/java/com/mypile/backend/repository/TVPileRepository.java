package com.mypile.backend.repository;

import com.mypile.backend.entities.TVPileItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TVPileRepository extends JpaRepository<TVPileItem, Long> {
    boolean existsByExternalId(Long externalId);
}