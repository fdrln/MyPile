import { useState, useEffect } from "react";
import { BACKEND_BASE } from "../constants/api";
import type { MediaDetail } from "../types/MediaDetail";

function mapMovieDetail(data: any): MediaDetail {
  return {
    id: data.id,
    title: data.title,
    tagline: data.tagline,
    overview: data.overview,
    posterPath: data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : undefined,
    rating: data.vote_average,
    voteCount: data.vote_count,
    releaseDate: data.release_date,
    status: data.status,
    genres: data.genres?.map((g: any) => g.name),
    runtime: data.runtime,
  };
}

function mapTVDetail(data: any): MediaDetail {
  return {
    id: data.id,
    title: data.name,
    tagline: data.tagline,
    overview: data.overview,
    posterPath: data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : undefined,
    rating: data.vote_average,
    voteCount: data.vote_count,
    releaseDate: data.first_air_date,
    lastAirDate: data.last_air_date,
    status: data.status,
    genres: data.genres?.map((g: any) => g.name),
    numberOfSeasons: data.number_of_seasons,
    numberOfEpisodes: data.number_of_episodes,
    createdBy: data.created_by?.map((c: any) => c.name),
    networks: data.networks?.map((n: any) => n.name),
  };
}

function mapGameDetail(data: any): MediaDetail {
  return {
    id: data.id,
    title: data.name,
    overview: data.description_raw ?? "",
    backdropPath: data.background_image,
    rating: data.metacritic ? data.metacritic / 10 : undefined,
    releaseDate: data.released,
    genres: data.genres?.map((g: any) => g.name),
    descriptionRaw: data.description_raw,
    playtime: data.playtime,
    esrbRating: data.esrb_rating?.name,
    developers: data.developers?.map((d: any) => d.name),
    platforms: data.platforms?.map((p: any) => p.platform.name),
    metacritic: data.metacritic,
  };
}

function mapBookDetail(data: any): MediaDetail {
  const coverId = data.covers?.[0];
  return {
    id: 0,
    title: data.title,
    overview: data.description?.value ?? data.description ?? "",
    posterPath: coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : undefined,
    genres: data.subjects?.slice(0, 5),
    description: data.description?.value ?? data.description ?? "",
    firstPublishDate: data.first_publish_date,
    coverIds: data.covers,
    subjects: data.subjects?.slice(0, 8),
  };
}

export function useMediaDetail(
  category: string | null,
  id: number | null,
  openLibraryKey?: string,
) {
  const [detail, setDetail] = useState<MediaDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!category || id === null) return;

    const url =
      category === "books"
        ? `${BACKEND_BASE}/search/detail/books?key=${openLibraryKey}`
        : `${BACKEND_BASE}/search/detail/${category}/${id}`;

    setIsLoading(true);
    setDetail(null);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const mapped =
          category === "movies"
            ? mapMovieDetail(data)
            : category === "tv"
              ? mapTVDetail(data)
              : category === "games"
                ? mapGameDetail(data)
                : mapBookDetail(data);
        setDetail(mapped);
        setIsLoading(false);
      });
  }, [category, id, openLibraryKey]);

  return { detail, isLoading };
}
