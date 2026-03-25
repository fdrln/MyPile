import CategoryPage from "../components/CategoryPage";
import BookCard from "../components/BookCard";
import type { BookPileItem } from "../services/pileService";

interface BooksPageProps {
  refreshPile: number;
}

export default function BooksPage({ refreshPile }: BooksPageProps) {
  return (
    <CategoryPage<BookPileItem>
      category="books"
      title="Books"
      emptyMessage="Nothing here yet — hit the + button to add your first book."
      refreshPile={refreshPile}
      renderCard={(item, onImageClick, onRemove) => (
        <BookCard
          key={item.id}
          title={item.title}
          titleImage={item.imageUrl}
          author={item.author ?? ""}
          publishYear={item.publishYear ?? ""}
          genre={item.genre}
          buttonLabel="Remove from pile"
          onImageClick={() =>
            onImageClick(item.externalId, item.openLibraryKey)
          }
          onAction={onRemove}
        />
      )}
    />
  );
}
