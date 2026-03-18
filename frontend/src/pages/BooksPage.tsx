import { useEffect, useState } from "react";
import { Title, Stack, SimpleGrid, Text } from "@mantine/core";
import {
  getItems,
  deleteItem,
  type BookPileItem,
} from "../services/pileService";
import BookCard from "../components/BookCard";
import { notifications } from "@mantine/notifications";
import PageHeader from "../components/Pageheader";

interface BooksPageProps {
  refreshPile: number;
}

export default function BooksPage({ refreshPile }: BooksPageProps) {
  const [pile, setPile] = useState<BookPileItem[]>([]);

  useEffect(() => {
    getItems("books").then((data) => setPile(data));
  }, [refreshPile]);

  return (
    <Stack p="xl" gap="xl">
      <PageHeader title="Books" />
      {pile.length === 0 ? (
        <Text c="dimmed" size="sm">
          Nothing here yet - hit the + button to add your first book.
        </Text>
      ) : (
        <SimpleGrid cols={{ base: 2, sm: 4, lg: 6, xl: 8 }} spacing="lg">
          {pile.map((item) => (
            <BookCard
              key={item.id}
              title={item.title}
              titleImage={item.imageUrl}
              author={item.author ?? ""}
              publishYear={item.publishYear ?? ""}
              genre={item.genre}
              buttonLabel="Remove from pile"
              onAction={() =>
                deleteItem("books", item.id!).then(() => {
                  getItems("books").then(setPile);
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
