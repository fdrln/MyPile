package com.mypile.backend.service;

import com.mypile.backend.entities.*;
import com.mypile.backend.repository.BookPileRepository;
import com.mypile.backend.repository.GamePileRepository;
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

    @Autowired
    private GamePileRepository gameRepo;

    @Autowired
    private BookPileRepository bookRepo;

    public List<? extends BasePileItem> getAll(String category) {
        return switch (category) {
            case "movies" -> movieRepo.findAll();
            case "tv" -> tvRepo.findAll();
            case "games" -> gameRepo.findAll();
            case "books" -> bookRepo.findAll();
            default -> throw new IllegalArgumentException("Unknown category: " + category);
        };
    }

    public MoviePileItem addMovie(MoviePileItem item) {
        return movieRepo.save(item);
    }

    public TVPileItem addTV(TVPileItem item) {
        return tvRepo.save(item);
    }

    public GamePileItem addGame(GamePileItem item) {
        return gameRepo.save(item);
    }

    public BookPileItem addBook(BookPileItem item) {
        return bookRepo.save(item);
    }

    public void delete(String category, Long id) {
        switch (category) {
            case "movies" -> movieRepo.deleteById(id);
            case "tv" -> tvRepo.deleteById(id);
            case "games" -> gameRepo.deleteById(id);
            case "books" -> bookRepo.deleteById(id);
            default -> throw new IllegalArgumentException("Unknown category: " + category);
        }
    }
}