package com.mypile.backend.controller;

import com.mypile.backend.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping(value = "/movies", produces = MediaType.APPLICATION_JSON_VALUE)
    public String searchMovies(@RequestParam(required = false) String q) {
        return q != null && !q.isEmpty()
                ? searchService.searchMovies(q)
                : searchService.getTrendingMovies();
    }

    @GetMapping(value = "/tv", produces = MediaType.APPLICATION_JSON_VALUE)
    public String searchTV(@RequestParam(required = false) String q) {
        return q != null && !q.isEmpty()
                ? searchService.searchTV(q)
                : searchService.getTrendingTV();
    }

    @GetMapping(value = "/games", produces = MediaType.APPLICATION_JSON_VALUE)
    public String searchGames(@RequestParam(required = false) String q) {
        return q != null && !q.isEmpty()
                ? searchService.searchGames(q)
                : searchService.getTrendingGames();
    }

    @GetMapping(value = "/books", produces = MediaType.APPLICATION_JSON_VALUE)
    public String searchBooks(@RequestParam(required = false) String q) {
        return q != null && !q.isEmpty()
                ? searchService.searchBooks(q)
                : searchService.getTrendingBooks();
    }

    @GetMapping(value = "/genres", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getGenres() {
        return searchService.getGenres();
    }

    @GetMapping(value = "/detail/movies/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getMovieDetail(@PathVariable Long id) {
        return searchService.getMovieDetail(id);
    }

    @GetMapping(value = "/detail/tv/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getTVDetail(@PathVariable Long id) {
        return searchService.getTVDetail(id);
    }

    @GetMapping(value = "/detail/games/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getGameDetail(@PathVariable Long id) {
        return searchService.getGameDetail(id);
    }

    @GetMapping(value = "/detail/books", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getBookDetail(@RequestParam String key) {
        return searchService.getBookDetail(key);
    }
}