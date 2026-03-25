package com.mypile.backend.controller;

import com.mypile.backend.dto.MediaDetailDTO;
import com.mypile.backend.dto.MediaSearchResultDTO;
import com.mypile.backend.service.SearchService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/movies")
    public List<MediaSearchResultDTO> searchMovies(@RequestParam(required = false) String q) {
        return q != null && !q.isEmpty()
                ? searchService.searchMovies(q)
                : searchService.getTrendingMovies();
    }

    @GetMapping("/tv")
    public List<MediaSearchResultDTO> searchTV(@RequestParam(required = false) String q) {
        return q != null && !q.isEmpty()
                ? searchService.searchTV(q)
                : searchService.getTrendingTV();
    }

    @GetMapping("/games")
    public List<MediaSearchResultDTO> searchGames(@RequestParam(required = false) String q) {
        return q != null && !q.isEmpty()
                ? searchService.searchGames(q)
                : searchService.getTrendingGames();
    }

    @GetMapping("/books")
    public List<MediaSearchResultDTO> searchBooks(@RequestParam(required = false) String q) {
        return q != null && !q.isEmpty()
                ? searchService.searchBooks(q)
                : searchService.getTrendingBooks();
    }

    @GetMapping("/genres")
    public SearchService.GenresResponse getGenres() {
        return searchService.getGenres();
    }

    @GetMapping("/detail/movies/{id}")
    public MediaDetailDTO getMovieDetail(@PathVariable Long id) {
        return searchService.getMovieDetail(id);
    }

    @GetMapping("/detail/tv/{id}")
    public MediaDetailDTO getTVDetail(@PathVariable Long id) {
        return searchService.getTVDetail(id);
    }

    @GetMapping("/detail/games/{id}")
    public MediaDetailDTO getGameDetail(@PathVariable Long id) {
        return searchService.getGameDetail(id);
    }

    @GetMapping("/detail/books")
    public MediaDetailDTO getBookDetail(@RequestParam String key) {
        return searchService.getBookDetail(key);
    }
}
