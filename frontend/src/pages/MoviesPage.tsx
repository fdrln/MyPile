import { useEffect, useState } from "react";
import { Title, Stack, SimpleGrid, Text } from "@mantine/core";
import {
  getItems,
  deleteItem,
  type MoviePileItem,
} from "../services/pileService";
import MovieCard from "../components/MovieCard";

interface MoviesPageProps {
  refreshPile: number;
}

export default function MoviesPage({ refreshPile }: MoviesPageProps) {
  const [pile, setPile] = useState<MoviePileItem[]>([]);

  useEffect(() => {
    getItems("movies").then((data) => setPile(data));
  }, [refreshPile]);

  return (
    <Stack p="xl" gap="xl">
      <div>
        <Text
          size="xs"
          tt="uppercase"
          c="dimmed"
          fw={600}
          style={{ letterSpacing: "2px" }}
        >
          Your Collection
        </Text>
        <Title
          order={1}
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-1px",
            lineHeight: 1.1,
          }}
        >
          Movies
        </Title>
      </div>
      {pile.length === 0 ? (
        <Text c="dimmed" size="sm">
          Nothing here yet - hit the + button to add your first movie.
        </Text>
      ) : (
        <SimpleGrid cols={{ base: 3, sm: 4, lg: 6, xl: 8 }} spacing="lg">
          {pile.map((item) => (
            <MovieCard
              key={item.id}
              title={item.title}
              titleImage={item.imageUrl}
              releaseDate={item.releaseDate}
              genre={item.genre}
              rating={item.rating}
              overview={item.overview}
              buttonLabel="Remove from pile"
              onAdd={() =>
                deleteItem("movies", item.id!).then(() =>
                  getItems("movies").then(setPile),
                )
              }
            />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
}
