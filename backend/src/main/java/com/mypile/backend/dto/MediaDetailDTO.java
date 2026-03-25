package com.mypile.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MediaDetailDTO {
    private Long id;
    private String title;
    private String tagline;
    private String overview;
    private String posterPath;
    private String backdropPath;
    private Double rating;
    private Integer voteCount;
    private String releaseDate;
    private String status;
    private List<String> genres;

    // Movies
    private Integer runtime;

    // TV
    private Integer numberOfSeasons;
    private Integer numberOfEpisodes;
    private List<String> createdBy;
    private List<String> networks;
    private String lastAirDate;

    // Games
    private String descriptionRaw;
    private Integer playtime;
    private String esrbRating;
    private List<String> developers;
    private List<String> platforms;
    private Integer metacritic;

    // Books
    private String description;
    private List<String> authors;
    private List<String> subjects;
    private String firstPublishDate;
    private List<Integer> coverIds;
}
