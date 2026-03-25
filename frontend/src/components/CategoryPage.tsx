import { useEffect, useState } from "react";
import { Stack, SimpleGrid, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getItems, deleteItem } from "../services/pileService";
import PageHeader from "./PageHeader";
import DetailModal from "./DetailModal";
import { notifications } from "@mantine/notifications";

interface CategoryPageProps<T> {
  category: "movies" | "tv" | "games" | "books";
  title: string;
  emptyMessage: string;
  refreshPile: number;
  footer?: React.ReactNode;
  renderCard: (
    item: T,
    onImageClick: (id: number, key?: string) => void,
    onRemove: () => void,
  ) => React.ReactNode;
}

type BaseItem = {
  id?: number;
  externalId: number;
  title: string;
  openLibraryKey?: string;
};

export default function CategoryPage<T extends BaseItem>({
  category,
  title,
  emptyMessage,
  refreshPile,
  footer,
  renderCard,
}: CategoryPageProps<T>) {
  const [pile, setPile] = useState<T[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined);
  const [detailOpened, { open: openDetail, close: closeDetail }] =
    useDisclosure(false);

  useEffect(() => {
    getItems(category).then((data) => setPile(data));
  }, [category, refreshPile]);

  const handleImageClick = (id: number, key?: string) => {
    setSelectedId(id);
    setSelectedKey(key);
    openDetail();
  };

  const handleRemove = (item: T) => {
    if (!item.id) return;
    deleteItem(category, item.id).then(() => {
      getItems(category).then(setPile);
      notifications.show({
        title: "Removed from pile",
        message: `${item.title} was removed`,
        color: "gray",
      });
    });
  };

  return (
    <Stack p="xl" gap="xl">
      <PageHeader title={title} />

      {pile.length === 0 ? (
        <Text c="dimmed" size="sm">
          {emptyMessage}
        </Text>
      ) : (
        <SimpleGrid cols={{ base: 3, sm: 4, lg: 6, xl: 8 }} spacing="lg">
          {pile.map((item) =>
            renderCard(
              item,
              (id, key) => handleImageClick(id, key),
              () => handleRemove(item),
            ),
          )}
        </SimpleGrid>
      )}

      {footer}

      <DetailModal
        opened={detailOpened}
        onClose={closeDetail}
        category={category}
        externalId={selectedId}
        openLibraryKey={selectedKey}
        actionLabel="Remove from pile"
        onAction={() => {
          const item = pile.find((i) => i.externalId === selectedId);
          if (item && item.id) {
            deleteItem(category, item.id).then(() => {
              getItems(category).then(setPile);
              closeDetail();
            });
          }
        }}
      />
    </Stack>
  );
}
