import type { CategoryId } from "../constants/categories";
import { useState, useEffect } from "react";
import { BACKEND_BASE } from "../constants/api";
import type { MediaSearchResult } from "../types/MediaSearchResult";
import type { TMDBMovie } from "../types/TmdbMovie";
import type { TMDBTVShow } from "../types/TmdbTv";
import type { RAWGGame } from "../types/RawgGame";
import type { OpenLibraryBook } from "../types/OpenLibrary";

const TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w500";
const OL_COVER_BASE = "https://covers.openlibrary.org/b/id";

export function useMediaSearch(
  category: CategoryId | null,
  searchQuery: string,
) {
  const [results, setResults] = useState<MediaSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!category) {
      setResults([]);
      return;
    }

    const url = (() => {
      switch (category) {
        case "tv":
          return searchQuery
            ? `${BACKEND_BASE}/search/tv?q=${searchQuery}`
            : `${BACKEND_BASE}/search/tv`;
        case "games":
          return searchQuery
            ? `${BACKEND_BASE}/search/games?q=${searchQuery}`
            : `${BACKEND_BASE}/search/games`;
        case "books":
          return searchQuery
            ? `${BACKEND_BASE}/search/books?q=${searchQuery}`
            : `${BACKEND_BASE}/search/books`;
        default:
          return searchQuery
            ? `${BACKEND_BASE}/search/movies?q=${searchQuery}`
            : `${BACKEND_BASE}/search/movies`;
      }
    })();

    if (!url) return;

    const timeout = setTimeout(
      () => {
        setIsLoading(true);
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            const mapped = (() => {
              switch (category) {
                case "tv":
                  return data.results.map((item: TMDBTVShow) => ({
                    id: item.id,
                    title: item.name,
                    overview: item.overview,
                    rating: item.vote_average,
                    releaseDate: item.first_air_date,
                    genre: item.genre_ids[0],
                    titleImage: `${TMDB_IMG_BASE}${item.poster_path}`,
                  }));
                case "games":
                  return data.results.map((item: RAWGGame) => ({
                    id: item.id,
                    title: item.name,
                    overview:
                      item.parent_platforms
                        ?.map((p) => p.platform.name)
                        .join(", ") ?? "",
                    rating: item.metacritic ? item.metacritic / 10 : undefined,
                    releaseDate: item.released,
                    genre: item.genres[0]?.name ?? "Unknown",
                    titleImage:
                      item.background_image?.replace(
                        "/media/",
                        "/media/resize/1280/-/",
                      ) ?? "",
                    metacritic: item.metacritic,
                  }));
                case "books": {
                  const books = searchQuery ? data.docs : data.works;
                  return (books ?? []).map(
                    (item: OpenLibraryBook, index: number) => ({
                      id: index,
                      title: item.title,
                      overview: item.author_name?.[0] ?? "Unknown author",
                      rating: undefined,
                      releaseDate: item.first_publish_year?.toString() ?? "",
                      genre: item.subject?.[0] ?? "Unknown",
                      titleImage: item.cover_i
                        ? `${OL_COVER_BASE}/${item.cover_i}-L.jpg`
                        : "",
                    }),
                  );
                }
                default:
                  return data.results.map((item: TMDBMovie) => ({
                    id: item.id,
                    title: item.title,
                    overview: item.overview,
                    rating: item.vote_average,
                    releaseDate: item.release_date,
                    genre: item.genre_ids[0],
                    titleImage: `${TMDB_IMG_BASE}${item.poster_path}`,
                  }));
              }
            })();
            setResults(mapped);
            setIsLoading(false);
          });
      },
      searchQuery ? 500 : 0,
    );

    return () => clearTimeout(timeout);
  }, [searchQuery, category]);

  return { results, isLoading };
}
