import { Anchor, Text } from "@mantine/core";
import CategoryPage from "../components/CategoryPage";
import GameCard from "../components/GameCard";
import type { GamePileItem } from "../services/pileService";

interface GamesPageProps {
  refreshPile: number;
}

export default function GamesPage({ refreshPile }: GamesPageProps) {
  return (
    <CategoryPage<GamePileItem>
      category="games"
      title="Games"
      emptyMessage="Nothing here yet — hit the + button to add your first game."
      refreshPile={refreshPile}
      footer={
        <Text size="xs" c="dimmed" mt="xl">
          Game data provided by{" "}
          <Anchor href="https://rawg.io" target="_blank" size="xs">
            RAWG
          </Anchor>
        </Text>
      }
      renderCard={(item, onImageClick, onRemove) => (
        <GameCard
          key={item.id}
          title={item.title}
          titleImage={item.imageUrl}
          releaseDate={item.releaseDate}
          genre={item.genre}
          rating={item.rating}
          overview={item.platforms ?? ""}
          buttonLabel="Remove from pile"
          onImageClick={() => onImageClick(item.externalId)}
          onAction={onRemove}
        />
      )}
    />
  );
}
