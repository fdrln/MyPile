import { useEffect, useState } from "react";
import { Stack, SimpleGrid, Text } from "@mantine/core";
import { getItems, deleteItem, type TVPileItem } from "../services/pileService";
import MovieCard from "../components/MovieCard";
import { notifications } from "@mantine/notifications";
import PageHeader from "../components/Pageheader";

interface TVPageProps {
  refreshPile: number;
}

export default function TVPage({ refreshPile }: TVPageProps) {
  const [pile, setPile] = useState<TVPileItem[]>([]);

  useEffect(() => {
    getItems("tv").then((data) => setPile(data));
  }, [refreshPile]);

  return (
    <Stack p="xl" gap="xl">
      <PageHeader title="TV Shows" />
      {pile.length === 0 ? (
        <Text c="dimmed" size="sm">
          Nothing here yet - hit the + button to add your first TV show.
        </Text>
      ) : (
        <SimpleGrid cols={{ base: 2, sm: 4, lg: 6, xl: 8 }} spacing="lg">
          {pile.map((item) => (
            <MovieCard
              key={item.id}
              title={item.title}
              titleImage={item.imageUrl}
              releaseDate={item.firstAirDate}
              genre={item.genre}
              rating={item.rating}
              overview={item.overview}
              buttonLabel="Remove from pile"
              onAction={() =>
                deleteItem("tv", item.id!).then(() => {
                  getItems("tv").then(setPile);
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
