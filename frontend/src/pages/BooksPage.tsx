import { useEffect, useState } from "react";
import { Title, Stack, SimpleGrid, Text } from "@mantine/core";
import {
  getItems,
  deleteItem,
  type BookPileItem,
} from "../services/pileService";
import BookCard from "../components/BookCard";
import { notifications } from "@mantine/notifications";

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
          Books
        </Title>
      </div>
      {pile.length === 0 ? (
        <Text c="dimmed" size="sm">
          Nothing here yet - hit the + button to add your first book.
        </Text>
      ) : (
        <SimpleGrid cols={{ base: 3, sm: 4, lg: 6, xl: 8 }} spacing="lg">
          {pile.map((item) => (
            <BookCard
              key={item.id}
              title={item.title}
              titleImage={item.imageUrl}
              author={item.author ?? ""}
              publishYear={item.publishYear ?? ""}
              genre={item.genre}
              buttonLabel="Remove from pile"
              onAdd={() =>
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
