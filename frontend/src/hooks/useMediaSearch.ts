import type { CategoryId } from "../constants/categories";
import { useState, useEffect } from "react";
import { TMDB_BASE, TMDB_KEY, TMDB_IMG_BASE } from "../constants/api";
import type { MediaSearchResult } from "../types/MediaSearchResult";
import type { TMDBMovie } from "../types/tmdb";
import type { TMDBTVShow } from "../types/tmdbTV";

export function useMediaSearch(
  category: CategoryId | null,
  searchQuery: string,
) {
  const [results, setResults] = useState<MediaSearchResult[]>([]);

  useEffect(() => {
    if (!category) {
      setResults([]);
      return;
    }

    const url = searchQuery
      ? category === "tv"
        ? `${TMDB_BASE}/search/tv?api_key=${TMDB_KEY}&query=${searchQuery}`
        : `${TMDB_BASE}/search/movie?api_key=${TMDB_KEY}&query=${searchQuery}`
      : category === "tv"
        ? `${TMDB_BASE}/trending/tv/week?api_key=${TMDB_KEY}`
        : `${TMDB_BASE}/trending/movie/week?api_key=${TMDB_KEY}`;

    const timeout = setTimeout(
      () => {
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
      },
      searchQuery ? 500 : 0,
    ); //MAYBE CHANGE?: added debounce to avoid spamming the api, only when loading "Trending" it has to be loaded instantly

    return () => clearTimeout(timeout);
  }, [searchQuery, category]);

  return { results };
}
