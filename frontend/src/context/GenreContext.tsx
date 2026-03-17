import { createContext, useContext, useState, useEffect } from "react";
import { BACKEND_BASE } from "../constants/api";

const GenreContext = createContext<Record<number, string>>({});

export function GenreProvider({ children }: { children: React.ReactNode }) {
  const [genres, setGenres] = useState<Record<number, string>>({});

  useEffect(() => {
    fetch(`${BACKEND_BASE}/search/genres`)
      .then((res) => res.json())
      .then((data) => {
        const allGenres = [...data.movie.genres, ...data.tv.genres];
        const genreMap = allGenres.reduce(
          (
            acc: Record<number, string>,
            genre: { id: number; name: string },
          ) => {
            acc[genre.id] = genre.name;
            return acc;
          },
          {},
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
