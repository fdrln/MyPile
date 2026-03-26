import type { CategoryId } from "../constants/categories";
import type { MediaSearchResult } from "../types/MediaSearchResult";
import BookCard from "./BookCard";
import GameCard from "./GameCard";
import MovieCard from "./MovieCard";

interface SearchCardProps {
  result: MediaSearchResult;
  category: CategoryId;
  onImageClick: () => void;
  onAction: () => void;
}

export default function SearchCard({
  result,
  category,
  onImageClick,
  onAction,
}: SearchCardProps) {
  switch (category) {
    case "books":
      return (
        <BookCard
          title={result.title}
          titleImage={result.titleImage}
          author={result.overview}
          publishYear={result.releaseDate}
          genre={result.genre}
          onImageClick={onImageClick}
          onAction={onAction}
        />
      );
    case "games":
      return (
        <GameCard
          title={result.title}
          titleImage={result.titleImage}
          releaseDate={result.releaseDate}
          genre={result.genre}
          rating={result.rating}
          overview={result.overview}
          onImageClick={onImageClick}
          onAction={onAction}
        />
      );
    default:
      return (
        <MovieCard
          title={result.title}
          titleImage={result.titleImage}
          releaseDate={result.releaseDate}
          genre={result.genre}
          rating={result.rating}
          overview={result.overview}
          onImageClick={onImageClick}
          onAction={onAction}
        />
      );
  }
}
