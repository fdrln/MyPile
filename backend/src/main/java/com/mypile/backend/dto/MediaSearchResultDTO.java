package com.mypile.backend.dto;

public record MediaSearchResultDTO(
        Long id,
        String title,
        String overview,
        Double rating,
        String releaseDate,
        String genre,
        String titleImage,
        Integer metacritic,
        String openLibraryKey
) {}
