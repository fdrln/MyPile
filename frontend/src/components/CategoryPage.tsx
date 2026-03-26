import { useState } from "react";
import { Stack, SimpleGrid, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { CategoryId } from "../constants/categories";
import { usePileItems } from "../hooks/usePileItems";
import PageHeader from "./PageHeader";
import DetailModal from "./DetailModal";

interface CategoryPageProps<T> {
  category: CategoryId;
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
  const { pile, removeItem } = usePileItems<T>(category, refreshPile);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined);
  const [detailOpened, { open: openDetail, close: closeDetail }] =
    useDisclosure(false);

  const handleImageClick = (id: number, key?: string) => {
    setSelectedId(id);
    setSelectedKey(key);
    openDetail();
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
              () => removeItem(item),
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
            removeItem(item);
            closeDetail();
          }
        }}
      />
    </Stack>
  );
}
