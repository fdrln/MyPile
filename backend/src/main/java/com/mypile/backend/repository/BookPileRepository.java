package com.mypile.backend.repository;

import com.mypile.backend.entities.BookPileItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookPileRepository extends JpaRepository<BookPileItem, Long> {
    boolean existsByExternalId(Long externalId);
}