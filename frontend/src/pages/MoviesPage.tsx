import { useEffect, useState } from "react";
import { Stack, SimpleGrid, Text } from "@mantine/core";
import {
  getItems,
  deleteItem,
  type MoviePileItem,
} from "../services/pileService";
import MovieCard from "../components/MovieCard";
import PageHeader from "../components/Pageheader";
import { notifications } from "@mantine/notifications";

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
      <PageHeader title="Movies" />
      {pile.length === 0 ? (
        <Text c="dimmed" size="sm">
          Nothing here yet — hit the + button to add your first movie.
        </Text>
      ) : (
        <SimpleGrid cols={{ base: 2, sm: 4, lg: 6, xl: 8 }} spacing="lg">
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
              onAction={() =>
                deleteItem("movies", item.id!).then(() => {
                  getItems("movies").then(setPile);
                  notifications.show({
                    title: "Removed from pile",
                    message: `${item.title} was removed`,
                    color: "gray",
                  });
                })
              }
            />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
}
