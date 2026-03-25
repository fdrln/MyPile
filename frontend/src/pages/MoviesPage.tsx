import CategoryPage from "../components/CategoryPage";
import MovieCard from "../components/MovieCard";
import type { MoviePileItem } from "../services/pileService";

interface MoviesPageProps {
  refreshPile: number;
}

export default function MoviesPage({ refreshPile }: MoviesPageProps) {
  return (
    <CategoryPage<MoviePileItem>
      category="movies"
      title="Movies"
      emptyMessage="Nothing here yet — hit the + button to add your first movie."
      refreshPile={refreshPile}
      renderCard={(item, onImageClick, onRemove) => (
        <MovieCard
          key={item.id}
          title={item.title}
          titleImage={item.imageUrl}
          releaseDate={item.releaseDate}
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
