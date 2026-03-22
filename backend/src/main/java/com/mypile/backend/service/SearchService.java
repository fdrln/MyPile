package com.mypile.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class SearchService {

    private final RestClient restClient = RestClient.create();

    @Value("${tmdb.api.key}")
    private String tmdbKey;

    @Value("${rawg.api.key}")
    private String rawgKey;

    private static final String TMDB_BASE = "https://api.themoviedb.org/3";
    private static final String RAWG_BASE = "https://api.rawg.io/api";
    private static final String OL_BASE = "https://openlibrary.org";

    public String searchMovies(String query) {
        return restClient.get()
                .uri(TMDB_BASE + "/search/movie?api_key=" + tmdbKey + "&query=" + query)
                .retrieve()
                .body(String.class);
    }

    public String searchTV(String query) {
        return restClient.get()
                .uri(TMDB_BASE + "/search/tv?api_key=" + tmdbKey + "&query=" + query)
                .retrieve()
                .body(String.class);
    }

    public String searchGames(String query) {
        return restClient.get()
                .uri(RAWG_BASE + "/games?key=" + rawgKey + "&search=" + query)
                .retrieve()
                .body(String.class);
    }

    public String searchBooks(String query) {
        return restClient.get()
                .uri(OL_BASE + "/search.json?q=" + query + "&limit=20")
                .retrieve()
                .body(String.class);
    }

    public String getTrendingMovies() {
        return restClient.get()
                .uri(TMDB_BASE + "/trending/movie/week?api_key=" + tmdbKey)
                .retrieve()
                .body(String.class);
    }

    public String getTrendingTV() {
        return restClient.get()
                .uri(TMDB_BASE + "/trending/tv/week?api_key=" + tmdbKey)
                .retrieve()
                .body(String.class);
    }

    public String getTrendingGames() {
        return restClient.get()
                .uri(RAWG_BASE + "/games?key=" + rawgKey + "&ordering=-added&page_size=20")
                .retrieve()
                .body(String.class);
    }

    public String getTrendingBooks() {
        return restClient.get()
                .uri(OL_BASE + "/trending/daily.json?limit=20")
                .retrieve()
                .body(String.class);
    }

    public String getGenres() {
        String movieGenres = restClient.get()
                .uri(TMDB_BASE + "/genre/movie/list?api_key=" + tmdbKey)
                .retrieve()
                .body(String.class);
        String tvGenres = restClient.get()
                .uri(TMDB_BASE + "/genre/tv/list?api_key=" + tmdbKey)
                .retrieve()
                .body(String.class);
        return "{\"movie\":" + movieGenres + ",\"tv\":" + tvGenres + "}";
    }

    public String getMovieDetail(Long id) {
        return restClient.get()
                .uri(TMDB_BASE + "/movie/" + id + "?api_key=" + tmdbKey)
                .retrieve()
                .body(String.class);
    }

    public String getTVDetail(Long id) {
        return restClient.get()
                .uri(TMDB_BASE + "/tv/" + id + "?api_key=" + tmdbKey)
                .retrieve()
                .body(String.class);
    }

    public String getGameDetail(Long id) {
        return restClient.get()
                .uri(RAWG_BASE + "/games/" + id + "?key=" + rawgKey)
                .retrieve()
                .body(String.class);
    }

    public String getBookDetail(String key) {
        return restClient.get()
                .uri("https://openlibrary.org" + key + ".json")
                .retrieve()
                .body(String.class);
    }
}