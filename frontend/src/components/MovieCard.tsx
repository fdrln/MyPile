import { Badge, Group, Text } from "@mantine/core";
import { ACCENT_COLOR } from "../constants/theme";
import { useGenres } from "../context/GenreContext";
import BaseCard from "./BaseCard";

interface MovieCardProps {
  title: string;
  titleImage: string;
  releaseDate: string;
  genre: number;
  rating?: number;
  overview: string;
  onAdd: () => void;
}

export default function MovieCard({
  title,
  titleImage,
  releaseDate,
  genre,
  rating,
  overview,
  onAdd,
}: MovieCardProps) {
  const genres = useGenres();

  return (
    <BaseCard title={title} titleImage={titleImage} onAdd={onAdd}>
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
          {genres[genre] ?? "Unknown"}
        </Badge>
      </Group>
      <Text size="xs" c="dimmed" lineClamp={4} style={{ flex: 1 }}>
        {overview ?? "No overview available."}
      </Text>
    </BaseCard>
  );
}
