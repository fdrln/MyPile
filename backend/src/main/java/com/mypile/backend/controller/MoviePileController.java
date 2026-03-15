package com.mypile.backend.controller;

import com.mypile.backend.entities.MoviePileItem;
import com.mypile.backend.repository.MoviePileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/movies")
public class MoviePileController {

    @Autowired
    private MoviePileRepository repository;

    @GetMapping
    public List<MoviePileItem> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public MoviePileItem add(@RequestBody MoviePileItem item) {
        return repository.save(item);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
