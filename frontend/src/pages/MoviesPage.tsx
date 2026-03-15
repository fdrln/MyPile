import { useEffect, useState } from "react";
import { Title, Stack, SimpleGrid } from "@mantine/core";
import { getMovies, type MoviePileItem } from "../services/pileService";
import MovieCard from "../components/MovieCard";

interface MoviesPageProps {
  refreshPile: number;
}

export default function MoviesPage({ refreshPile }: MoviesPageProps) {
  const [pile, setPile] = useState<MoviePileItem[]>([]);

  useEffect(() => {
    getMovies().then((data) => setPile(data));
  }, [refreshPile]);

  return (
    <Stack p="md">
      <Title order={2}>My Movies</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }}>
        {pile.map((item) => (
          <MovieCard
            key={item.id}
            title={item.title}
            titleImage={item.imageUrl}
            releaseDate={item.releaseDate}
            genre={item.genre}
            rating={item.rating}
            overview={item.overview}
            onAdd={() => {}}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
