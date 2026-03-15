import type { CategoryId } from "../constants/categories";
import { useState, useEffect } from "react";
import { TMDB_BASE, TMDB_KEY, TMDB_IMG_BASE } from "../constants/api";
import type { Movie } from "../types/movie";
import type { TMDBMovie } from "../types/tmdb";
import type { TMDBTVShow } from "../types/tmdbTV";

export function useMediaSearch(
  category: CategoryId | null,
  searchQuery: string,
) {
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    const url =
      category === "tv"
        ? `${TMDB_BASE}/search/tv?api_key=${TMDB_KEY}&query=${searchQuery}`
        : `${TMDB_BASE}/search/movie?api_key=${TMDB_KEY}&query=${searchQuery}`;

    const timeout = setTimeout(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const mapped =
            category === "tv"
              ? data.results.map((item: TMDBTVShow) => ({
                  id: item.id,
                  title: item.name,
                  overview: item.overview,
                  rating: item.vote_average,
                  releaseDate: item.first_air_date,
                  genre: item.genre_ids[0],
                  titleImage: `${TMDB_IMG_BASE}${item.poster_path}`,
                }))
              : data.results.map((item: TMDBMovie) => ({
                  id: item.id,
                  title: item.title,
                  overview: item.overview,
                  rating: item.vote_average,
                  releaseDate: item.release_date,
                  genre: item.genre_ids[0],
                  titleImage: `${TMDB_IMG_BASE}${item.poster_path}`,
                }));
          setResults(mapped);
        });
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery, category]);

  return { results };
}
