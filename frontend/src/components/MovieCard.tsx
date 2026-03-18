import { Badge, Group, Text } from "@mantine/core";
import { ACCENT_COLOR } from "../constants/theme";
import { useGenres } from "../context/GenreContext";
import BaseCard from "./BaseCard";

interface MovieCardProps {
  title: string;
  titleImage: string;
  releaseDate: string;
  genre: number | string;
  rating?: number;
  overview: string;
  onAction: () => void;
  buttonLabel?: string;
}

function resolveGenre(
  genre: number | string,
  genres: Record<number, string>,
): string {
  if (typeof genre === "string" && isNaN(Number(genre))) return genre;
  return genres[Number(genre)] ?? "Unknown";
}

export default function MovieCard({
  title,
  titleImage,
  releaseDate,
  genre,
  rating,
  overview,
  buttonLabel,
  onAction,
}: MovieCardProps) {
  const genres = useGenres();

  return (
    <BaseCard
      title={title}
      titleImage={titleImage}
      onAction={onAction}
      buttonLabel={buttonLabel}
    >
      <Group justify="space-between" align="center">
        <Text fw={500} size="sm" truncate="end" style={{ flex: 1 }}>
          {title}
        </Text>
        <Badge color={ACCENT_COLOR} variant="filled" size="sm">
          {rating && rating > 0 ? rating.toFixed(1) : "?"}
        </Badge>
      </Group>
      <Group gap={6}>
        <Badge variant="filled" color="dark" size="sm">
          {releaseDate ? releaseDate.substring(0, 4) : "N/A"}
        </Badge>
        <Badge variant="filled" color="dark" size="sm">
          {resolveGenre(genre, genres)}
        </Badge>
      </Group>
      <Text size="xs" c="dimmed" lineClamp={4} style={{ flex: 1 }}>
        {overview ?? "No overview available."}
      </Text>
    </BaseCard>
  );
}
