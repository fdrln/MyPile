import CategoryPage from "../components/CategoryPage";
import MovieCard from "../components/MovieCard";
import type { TVPileItem } from "../services/pileService";

interface TVPageProps {
  refreshPile: number;
}

export default function TVPage({ refreshPile }: TVPageProps) {
  return (
    <CategoryPage<TVPileItem>
      category="tv"
      title="TV Shows"
      emptyMessage="Nothing here yet — hit the + button to add your first TV show."
      refreshPile={refreshPile}
      renderCard={(item, onImageClick, onRemove) => (
        <MovieCard
          key={item.id}
          title={item.title}
          titleImage={item.imageUrl}
          releaseDate={item.firstAirDate} // Mapping TV specific property to the card
          genre={item.genre}
          rating={item.rating}
          overview={item.overview}
          buttonLabel="Remove from pile"
          onImageClick={() => onImageClick(item.externalId)}
          onAction={onRemove}
        />
      )}
    />
  );
}
