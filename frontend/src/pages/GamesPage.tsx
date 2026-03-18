import { useEffect, useState } from "react";
import { Title, Stack, SimpleGrid, Text, Anchor } from "@mantine/core";
import {
  getItems,
  deleteItem,
  type GamePileItem,
} from "../services/pileService";
import GameCard from "../components/GameCard";
import { notifications } from "@mantine/notifications";
import PageHeader from "../components/Pageheader";

interface GamesPageProps {
  refreshPile: number;
}

export default function GamesPage({ refreshPile }: GamesPageProps) {
  const [pile, setPile] = useState<GamePileItem[]>([]);

  useEffect(() => {
    getItems("games").then((data) => setPile(data));
  }, [refreshPile]);

  return (
    <Stack p="xl" gap="xl">
      <PageHeader title="Games" />
      {pile.length === 0 ? (
        <Text c="dimmed" size="sm">
          Nothing here yet — hit the + button to add your first game.
        </Text>
      ) : (
        <SimpleGrid cols={{ base: 2, sm: 4, lg: 6, xl: 8 }} spacing="lg">
          {pile.map((item) => (
            <GameCard
              key={item.id}
              title={item.title}
              titleImage={item.imageUrl}
              releaseDate={item.releaseDate}
              genre={item.genre}
              rating={item.rating}
              overview={item.platforms ?? ""}
              buttonLabel="Remove from pile"
              onAction={() =>
                deleteItem("games", item.id!).then(() => {
                  getItems("games").then(setPile);
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
      <Text size="xs" c="dimmed" mt="xl">
        Game data provided by{" "}
        <Anchor href="https://rawg.io" target="_blank" size="xs">
          RAWG
        </Anchor>
      </Text>
    </Stack>
  );
}
