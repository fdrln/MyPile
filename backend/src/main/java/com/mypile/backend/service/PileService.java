package com.mypile.backend.service;

import com.mypile.backend.entities.BasePileItem;
import com.mypile.backend.entities.MoviePileItem;
import com.mypile.backend.entities.TVPileItem;
import com.mypile.backend.repository.MoviePileRepository;
import com.mypile.backend.repository.TVPileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PileService {

    @Autowired
    private MoviePileRepository movieRepo;

    @Autowired
    private TVPileRepository tvRepo;

    public List<? extends BasePileItem> getAll(String category) {
        return switch (category) {
            case "movies" -> movieRepo.findAll();
            case "tv" -> tvRepo.findAll();
            default -> throw new IllegalArgumentException("Unknown category: " + category);
        };
    }

    public MoviePileItem addMovie(MoviePileItem item) {
        return movieRepo.save(item);
    }

    public TVPileItem addTV(TVPileItem item) {
        return tvRepo.save(item);
    }

    public void delete(String category, Long id) {
        switch (category) {
            case "movies" -> movieRepo.deleteById(id);
            case "tv" -> tvRepo.deleteById(id);
            default -> throw new IllegalArgumentException("Unknown category: " + category);
        }
    }
}