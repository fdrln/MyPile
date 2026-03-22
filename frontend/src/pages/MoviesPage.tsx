import { useEffect, useState } from "react";
import { Stack, SimpleGrid, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  getItems,
  deleteItem,
  type MoviePileItem,
} from "../services/pileService";
import MovieCard from "../components/MovieCard";
import PageHeader from "../components/PageHeader";
import DetailModal from "../components/DetailModal";
import { notifications } from "@mantine/notifications";

interface MoviesPageProps {
  refreshPile: number;
}

export default function MoviesPage({ refreshPile }: MoviesPageProps) {
  const [pile, setPile] = useState<MoviePileItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detailOpened, { open: openDetail, close: closeDetail }] =
    useDisclosure(false);

  useEffect(() => {
    getItems("movies").then((data) => setPile(data));
  }, [refreshPile]);

  const handleImageClick = (id: number) => {
    setSelectedId(id);
    openDetail();
  };

  return (
    <Stack p="xl" gap="xl">
      <PageHeader title="Movies" />
      {pile.length === 0 ? (
        <Text c="dimmed" size="sm">
          Nothing here yet — hit the + button to add your first movie.
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
              onImageClick={() => handleImageClick(item.externalId)}
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
      <DetailModal
        opened={detailOpened}
        onClose={closeDetail}
        category="movies"
        externalId={selectedId}
        onAction={() => {
          const item = pile.find((i) => i.externalId === selectedId);
          if (item)
            deleteItem("movies", item.id!).then(() => {
              getItems("movies").then(setPile);
              closeDetail();
            });
        }}
        actionLabel="Remove from pile"
      />
    </Stack>
  );
}
