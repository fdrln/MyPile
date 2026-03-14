import MovieCard from "./components/MovieCard";
import { useState, useEffect } from "react";
import type { TMDBMovie } from "./types/tmdb";
import type { Movie } from "./types/movie";
import { Container, SimpleGrid, TextInput, Title } from "@mantine/core";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const url = searchQuery
      ? `https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${searchQuery}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

    const timeout = setTimeout(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) =>
          setMovies(
            data.results.map((movie: TMDBMovie) => ({
              id: movie.id,
              title: movie.title,
              releaseDate: movie.release_date,
              genre: movie.genre_ids[0],
              titleImage: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })),
          ),
        );
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <>
      <Container>
        <Title>MyPile</Title>
        <TextInput
          placeholder="Search... "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 5 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              releaseDate={movie.releaseDate}
              genre={movie.genre}
              titleImage={movie.titleImage}
            />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
