package com.mypile.backend.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mypile.backend.dto.MediaDetailDTO;
import com.mypile.backend.dto.MediaSearchResultDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import tools.jackson.databind.JsonNode;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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
    private static final String TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w500";
    private static final String OL_COVER_BASE = "https://covers.openlibrary.org/b/id";

    // ── External API response types ───────────────────────────────────────────

    @JsonIgnoreProperties(ignoreUnknown = true)
    record TmdbSearchResponse(List<TmdbSearchResult> results) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record TmdbSearchResult(
            Long id,
            String title,
            String name,
            String overview,
            @JsonProperty("vote_average") Double voteAverage,
            @JsonProperty("genre_ids") List<Integer> genreIds,
            @JsonProperty("poster_path") String posterPath,
            @JsonProperty("release_date") String releaseDate,
            @JsonProperty("first_air_date") String firstAirDate
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record TmdbMovieDetail(
            Long id,
            String title,
            String tagline,
            String overview,
            @JsonProperty("poster_path") String posterPath,
            @JsonProperty("vote_average") Double voteAverage,
            @JsonProperty("vote_count") Integer voteCount,
            @JsonProperty("release_date") String releaseDate,
            String status,
            List<TmdbGenre> genres,
            Integer runtime
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record TmdbTVDetail(
            Long id,
            String name,
            String tagline,
            String overview,
            @JsonProperty("poster_path") String posterPath,
            @JsonProperty("vote_average") Double voteAverage,
            @JsonProperty("vote_count") Integer voteCount,
            @JsonProperty("first_air_date") String firstAirDate,
            @JsonProperty("last_air_date") String lastAirDate,
            String status,
            List<TmdbGenre> genres,
            @JsonProperty("number_of_seasons") Integer numberOfSeasons,
            @JsonProperty("number_of_episodes") Integer numberOfEpisodes,
            @JsonProperty("created_by") List<TmdbCreator> createdBy,
            List<TmdbNetwork> networks
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record TmdbGenre(Long id, String name) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record TmdbCreator(Long id, String name) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record TmdbNetwork(Long id, String name) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record TmdbGenreListResponse(List<TmdbGenre> genres) {
    }

    public record GenresResponse(TmdbGenreListResponse movie, TmdbGenreListResponse tv) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record RawgSearchResponse(List<RawgSearchResult> results) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record RawgSearchResult(
            Long id,
            String name,
            String released,
            @JsonProperty("background_image") String backgroundImage,
            Double rating,
            Integer metacritic,
            List<RawgGenre> genres,
            @JsonProperty("parent_platforms") List<RawgPlatformWrapper> parentPlatforms
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record RawgGameDetail(
            Long id,
            String name,
            @JsonProperty("description_raw") String descriptionRaw,
            @JsonProperty("background_image") String backgroundImage,
            Double rating,
            Integer metacritic,
            String released,
            List<RawgGenre> genres,
            Integer playtime,
            @JsonProperty("esrb_rating") RawgEsrb esrbRating,
            List<RawgDeveloper> developers,
            List<RawgPlatformWrapper> platforms
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record RawgGenre(Long id, String name) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record RawgPlatformWrapper(RawgPlatform platform) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record RawgPlatform(Long id, String name) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record RawgEsrb(String name) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record RawgDeveloper(Long id, String name) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record OlSearchResponse(List<OlDoc> docs) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record OlTrendingResponse(List<OlDoc> works) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record OlDoc(
            String key,
            String title,
            @JsonProperty("author_name") List<String> authorName,
            @JsonProperty("first_publish_year") Integer firstPublishYear,
            @JsonProperty("cover_i") Integer coverId,
            List<String> subject
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record OlBookDetail(
            String title,
            JsonNode description,
            List<Integer> covers,
            List<String> subjects,
            @JsonProperty("first_publish_date") String firstPublishDate
    ) {
    }

    // ── Search ────────────────────────────────────────────────────────────────

    public List<MediaSearchResultDTO> searchMovies(String query) {
        TmdbSearchResponse response = restClient.get()
                .uri(TMDB_BASE + "/search/movie?api_key={key}&query={q}", tmdbKey, query)
                .retrieve()
                .body(TmdbSearchResponse.class);
        return response == null || response.results() == null ? List.of()
                : response.results().stream().map(this::mapTmdbMovieToSearchResult).toList();
    }

    public List<MediaSearchResultDTO> searchTV(String query) {
        TmdbSearchResponse response = restClient.get()
                .uri(TMDB_BASE + "/search/tv?api_key={key}&query={q}", tmdbKey, query)
                .retrieve()
                .body(TmdbSearchResponse.class);
        return response == null || response.results() == null ? List.of()
                : response.results().stream().map(this::mapTmdbTVToSearchResult).toList();
    }

    public List<MediaSearchResultDTO> searchGames(String query) {
        RawgSearchResponse response = restClient.get()
                .uri(RAWG_BASE + "/games?key={key}&search={q}", rawgKey, query)
                .retrieve()
                .body(RawgSearchResponse.class);
        return response == null || response.results() == null ? List.of()
                : response.results().stream().map(this::mapRawgToSearchResult).toList();
    }

    public List<MediaSearchResultDTO> searchBooks(String query) {
        OlSearchResponse response = restClient.get()
                .uri(OL_BASE + "/search.json?q={q}&limit=20", query)
                .retrieve()
                .body(OlSearchResponse.class);
        if (response == null || response.docs() == null) return List.of();
        List<OlDoc> docs = response.docs();
        return IntStream.range(0, docs.size())
                .mapToObj(i -> mapOlDocToSearchResult(docs.get(i), i))
                .toList();
    }

    // ── Trending ──────────────────────────────────────────────────────────────

    public List<MediaSearchResultDTO> getTrendingMovies() {
        TmdbSearchResponse response = restClient.get()
                .uri(TMDB_BASE + "/trending/movie/week?api_key={key}", tmdbKey)
                .retrieve()
                .body(TmdbSearchResponse.class);
        return response == null || response.results() == null ? List.of()
                : response.results().stream().map(this::mapTmdbMovieToSearchResult).toList();
    }

    public List<MediaSearchResultDTO> getTrendingTV() {
        TmdbSearchResponse response = restClient.get()
                .uri(TMDB_BASE + "/trending/tv/week?api_key={key}", tmdbKey)
                .retrieve()
                .body(TmdbSearchResponse.class);
        return response == null || response.results() == null ? List.of()
                : response.results().stream().map(this::mapTmdbTVToSearchResult).toList();
    }

    public List<MediaSearchResultDTO> getTrendingGames() {
        RawgSearchResponse response = restClient.get()
                .uri(RAWG_BASE + "/games?key={key}&ordering=-added&page_size=20", rawgKey)
                .retrieve()
                .body(RawgSearchResponse.class);
        return response == null || response.results() == null ? List.of()
                : response.results().stream().map(this::mapRawgToSearchResult).toList();
    }

    public List<MediaSearchResultDTO> getTrendingBooks() {
        OlTrendingResponse response = restClient.get()
                .uri(OL_BASE + "/trending/daily.json?limit=20")
                .retrieve()
                .body(OlTrendingResponse.class);
        if (response == null || response.works() == null) return List.of();
        List<OlDoc> works = response.works();
        return IntStream.range(0, works.size())
                .mapToObj(i -> mapOlDocToSearchResult(works.get(i), i))
                .toList();
    }

    // ── Genres ────────────────────────────────────────────────────────────────

    public GenresResponse getGenres() {
        TmdbGenreListResponse movieGenres = restClient.get()
                .uri(TMDB_BASE + "/genre/movie/list?api_key={key}", tmdbKey)
                .retrieve()
                .body(TmdbGenreListResponse.class);
        TmdbGenreListResponse tvGenres = restClient.get()
                .uri(TMDB_BASE + "/genre/tv/list?api_key={key}", tmdbKey)
                .retrieve()
                .body(TmdbGenreListResponse.class);
        return new GenresResponse(movieGenres, tvGenres);
    }

    // ── Detail ────────────────────────────────────────────────────────────────

    public MediaDetailDTO getMovieDetail(Long id) {
        TmdbMovieDetail data = restClient.get()
                .uri(TMDB_BASE + "/movie/{id}?api_key={key}", id, tmdbKey)
                .retrieve()
                .body(TmdbMovieDetail.class);
        if (data == null) return null;
        return MediaDetailDTO.builder()
                .id(data.id())
                .title(data.title())
                .tagline(data.tagline())
                .overview(data.overview())
                .posterPath(data.posterPath() != null ? TMDB_IMG_BASE + data.posterPath() : null)
                .rating(data.voteAverage())
                .voteCount(data.voteCount())
                .releaseDate(data.releaseDate())
                .status(data.status())
                .genres(data.genres() != null ? data.genres().stream().map(TmdbGenre::name).toList() : null)
                .runtime(data.runtime())
                .build();
    }

    public MediaDetailDTO getTVDetail(Long id) {
        TmdbTVDetail data = restClient.get()
                .uri(TMDB_BASE + "/tv/{id}?api_key={key}", id, tmdbKey)
                .retrieve()
                .body(TmdbTVDetail.class);
        if (data == null) return null;
        return MediaDetailDTO.builder()
                .id(data.id())
                .title(data.name())
                .tagline(data.tagline())
                .overview(data.overview())
                .posterPath(data.posterPath() != null ? TMDB_IMG_BASE + data.posterPath() : null)
                .rating(data.voteAverage())
                .voteCount(data.voteCount())
                .releaseDate(data.firstAirDate())
                .lastAirDate(data.lastAirDate())
                .status(data.status())
                .genres(data.genres() != null ? data.genres().stream().map(TmdbGenre::name).toList() : null)
                .numberOfSeasons(data.numberOfSeasons())
                .numberOfEpisodes(data.numberOfEpisodes())
                .createdBy(data.createdBy() != null ? data.createdBy().stream().map(TmdbCreator::name).toList() : null)
                .networks(data.networks() != null ? data.networks().stream().map(TmdbNetwork::name).toList() : null)
                .build();
    }

    public MediaDetailDTO getGameDetail(Long id) {
        RawgGameDetail data = restClient.get()
                .uri(RAWG_BASE + "/games/{id}?key={key}", id, rawgKey)
                .retrieve()
                .body(RawgGameDetail.class);
        if (data == null) return null;
        String backdropPath = data.backgroundImage() != null
                ? data.backgroundImage().replace("/media/", "/media/resize/1280/-/")
                : null;
        return MediaDetailDTO.builder()
                .id(data.id())
                .title(data.name())
                .overview(data.descriptionRaw() != null ? data.descriptionRaw() : "")
                .backdropPath(backdropPath)
                .rating(data.metacritic() != null ? data.metacritic() / 10.0 : null)
                .releaseDate(data.released())
                .genres(data.genres() != null ? data.genres().stream().map(RawgGenre::name).toList() : null)
                .descriptionRaw(data.descriptionRaw())
                .playtime(data.playtime())
                .esrbRating(data.esrbRating() != null ? data.esrbRating().name() : null)
                .developers(data.developers() != null ? data.developers().stream().map(RawgDeveloper::name).toList() : null)
                .platforms(data.platforms() != null ? data.platforms().stream().map(p -> p.platform().name()).toList() : null)
                .metacritic(data.metacritic())
                .build();
    }

    public MediaDetailDTO getBookDetail(String key) {
        OlBookDetail data = restClient.get()
                .uri(OL_BASE + key + ".json")
                .retrieve()
                .body(OlBookDetail.class);
        if (data == null) return null;
        String description = extractOlDescription(data.description());
        Integer coverId = data.covers() != null && !data.covers().isEmpty() ? data.covers().get(0) : null;
        String posterPath = coverId != null ? OL_COVER_BASE + "/" + coverId + "-L.jpg" : null;
        List<String> subjects = data.subjects();
        return MediaDetailDTO.builder()
                .id(0L)
                .title(data.title())
                .overview(description != null ? description : "")
                .posterPath(posterPath)
                .genres(subjects != null ? subjects.subList(0, Math.min(5, subjects.size())) : null)
                .description(description)
                .subjects(subjects != null ? subjects.subList(0, Math.min(8, subjects.size())) : null)
                .firstPublishDate(data.firstPublishDate())
                .coverIds(data.covers())
                .build();
    }

    // ── Mapping helpers ───────────────────────────────────────────────────────

    private MediaSearchResultDTO mapTmdbMovieToSearchResult(TmdbSearchResult item) {
        String genre = item.genreIds() != null && !item.genreIds().isEmpty()
                ? String.valueOf(item.genreIds().get(0)) : "Unknown";
        String image = item.posterPath() != null ? TMDB_IMG_BASE + item.posterPath() : "";
        return new MediaSearchResultDTO(item.id(), item.title(), item.overview(),
                item.voteAverage(), item.releaseDate(), genre, image, null, null);
    }

    private MediaSearchResultDTO mapTmdbTVToSearchResult(TmdbSearchResult item) {
        String genre = item.genreIds() != null && !item.genreIds().isEmpty()
                ? String.valueOf(item.genreIds().get(0)) : "Unknown";
        String image = item.posterPath() != null ? TMDB_IMG_BASE + item.posterPath() : "";
        return new MediaSearchResultDTO(item.id(), item.name(), item.overview(),
                item.voteAverage(), item.firstAirDate(), genre, image, null, null);
    }

    private MediaSearchResultDTO mapRawgToSearchResult(RawgSearchResult item) {
        String genre = item.genres() != null && !item.genres().isEmpty()
                ? item.genres().get(0).name() : "Unknown";
        String platforms = item.parentPlatforms() != null
                ? item.parentPlatforms().stream().map(p -> p.platform().name()).collect(Collectors.joining(", "))
                : "";
        String image = item.backgroundImage() != null
                ? item.backgroundImage().replace("/media/", "/media/resize/1280/-/") : "";
        return new MediaSearchResultDTO(item.id(), item.name(), platforms,
                item.metacritic() != null ? item.metacritic() / 10.0 : null,
                item.released(), genre, image, item.metacritic(), null);
    }

    private MediaSearchResultDTO mapOlDocToSearchResult(OlDoc item, int index) {
        String author = item.authorName() != null && !item.authorName().isEmpty()
                ? item.authorName().get(0) : "Unknown author";
        String genre = item.subject() != null && !item.subject().isEmpty()
                ? item.subject().get(0) : "Unknown";
        String image = item.coverId() != null ? OL_COVER_BASE + "/" + item.coverId() + "-L.jpg" : "";
        String releaseDate = item.firstPublishYear() != null ? String.valueOf(item.firstPublishYear()) : "";
        return new MediaSearchResultDTO((long) index, item.title(), author, null,
                releaseDate, genre, image, null, item.key());
    }

    private String extractOlDescription(JsonNode description) {
        if (description == null) return null;
        if (description.isTextual()) return description.asText();
        JsonNode value = description.get("value");
        return value != null ? value.asText() : null;
    }
}
