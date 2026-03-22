import {
  Modal,
  SimpleGrid,
  Stack,
  Button,
  Text,
  TextInput,
  ActionIcon,
  Group,
  Divider,
  Loader,
} from "@mantine/core";
import { CATEGORIES, type CategoryId } from "../constants/categories";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { ACCENT_COLOR } from "../constants/theme";
import { IconArrowLeft } from "@tabler/icons-react";
import { useMediaSearch } from "../hooks/useMediaSearch";
import MovieCard from "./MovieCard";
import DetailModal from "./DetailModal";
import {
  addItem,
  type MoviePileItem,
  type TVPileItem,
  type GamePileItem,
  type BookPileItem,
} from "../services/pileService";
import type { MediaSearchResult } from "../types/MediaSearchResult";
import { notifications } from "@mantine/notifications";

interface AddModalProps {
  opened: boolean;
  onClose: () => void;
  onItemAdded: () => void;
}

function buildPileItem(
  result: MediaSearchResult,
  category: CategoryId,
): MoviePileItem | TVPileItem | GamePileItem | BookPileItem {
  const base = {
    externalId: result.id,
    title: result.title,
    imageUrl: result.titleImage,
    genre: result.genre,
    rating: result.rating,
    overview: result.overview,
  };

  switch (category) {
    case "tv":
      return { ...base, firstAirDate: result.releaseDate } as TVPileItem;
    case "games":
      return {
        ...base,
        releaseDate: result.releaseDate,
        metacritic: result.metacritic ?? null,
        platforms: result.overview,
      } as GamePileItem;
    case "books":
      return {
        ...base,
        author: result.overview,
        publishYear: result.releaseDate,
        openLibraryKey: result.openLibraryKey,
      } as BookPileItem;
    default:
      return { ...base, releaseDate: result.releaseDate } as MoviePileItem;
  }
}

export default function AddModal({
  opened,
  onClose,
  onItemAdded,
}: AddModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [detailId, setDetailId] = useState<number | null>(null);
  const [detailKey, setDetailKey] = useState<string | undefined>(undefined);
  const [detailOpened, { open: openDetail, close: closeDetail }] =
    useDisclosure(false);

  const { results, isLoading } = useMediaSearch(selectedCategory, searchQuery);

  const handleAdd = async (result: MediaSearchResult) => {
    if (!selectedCategory) return;
    await addItem(selectedCategory, buildPileItem(result, selectedCategory));
    onItemAdded();
    notifications.show({
      title: "Added to pile!",
      message: `${result.title} was added to your pile`,
      color: ACCENT_COLOR,
    });
  };

  const handleImageClick = (result: MediaSearchResult) => {
    setDetailId(result.id);
    setDetailKey(result.openLibraryKey);
    openDetail();
  };

  const handleClose = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    onClose();
  };

  const selectedCategoryLabel = CATEGORIES.find(
    (c) => c.id === selectedCategory,
  )?.label;

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        centered
        size="auto"
        title={
          selectedCategory === null
            ? "Add to Pile"
            : `Add ${selectedCategoryLabel}`
        }
      >
        {selectedCategory === null ? (
          <SimpleGrid cols={2}>
            {CATEGORIES.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant="outline"
                color={ACCENT_COLOR}
                h={120}
                w="100%"
              >
                <Stack align="center" gap="xs">
                  <Text>{category.label}</Text>
                  {category.icon}
                </Stack>
              </Button>
            ))}
          </SimpleGrid>
        ) : (
          <Stack>
            <Group>
              <ActionIcon
                onClick={() => setSelectedCategory(null)}
                variant="subtle"
              >
                <IconArrowLeft />
              </ActionIcon>
              <Text fw={500}>{selectedCategoryLabel}</Text>
            </Group>
            <TextInput
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Divider
              label={searchQuery ? "Results" : "Trending this week"}
              labelPosition="left"
              mt="s"
            />
            {isLoading ? (
              <Group justify="center" p="xl">
                <Loader color={ACCENT_COLOR} />
              </Group>
            ) : (
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }}>
                {results.map((result) => (
                  <MovieCard
                    key={result.id}
                    title={result.title}
                    titleImage={result.titleImage}
                    releaseDate={result.releaseDate}
                    genre={result.genre}
                    rating={result.rating}
                    overview={result.overview}
                    onImageClick={() => handleImageClick(result)}
                    onAction={() => handleAdd(result)}
                  />
                ))}
              </SimpleGrid>
            )}
          </Stack>
        )}
      </Modal>

      <DetailModal
        opened={detailOpened}
        onClose={closeDetail}
        category={selectedCategory}
        externalId={detailId}
        openLibraryKey={detailKey}
      />
    </>
  );
}
