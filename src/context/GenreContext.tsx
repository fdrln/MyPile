import { createContext, useContext, useState, useEffect } from "react";
import { TMDB_BASE, TMDB_KEY } from "../constants/api";

const GenreContext = createContext<Record<number, string>>({});

export function GenreProvider({ children }: { children: React.ReactNode }) {
  const [genres, setGenres] = useState<Record<number, string>>({});

  useEffect(() => {
    Promise.all([
      fetch(`${TMDB_BASE}/genre/movie/list?api_key=${TMDB_KEY}`).then((res) =>
        res.json(),
      ),
      fetch(`${TMDB_BASE}/genre/tv/list?api_key=${TMDB_KEY}`).then((res) =>
        res.json(),
      ),
    ]).then(([movieGenres, tvGenres]) => {
      const allGenres = [...movieGenres.genres, ...tvGenres.genres];
      const genreMap = allGenres.reduce(
        (acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        },
        {} as Record<number, string>,
      );
      setGenres(genreMap);
    });
  }, []);

  return (
    <GenreContext.Provider value={genres}>{children}</GenreContext.Provider>
  );
}

export function useGenres() {
  return useContext(GenreContext);
}
