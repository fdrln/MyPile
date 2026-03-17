import { Badge, Group, Text } from "@mantine/core";
import { ACCENT_COLOR } from "../constants/theme";
import BaseCard from "./BaseCard";

interface GameCardProps {
  title: string;
  titleImage: string;
  releaseDate: string;
  genre: number | string;
  rating?: number;
  overview: string;
  onAdd: () => void;
  buttonLabel?: string;
}

export default function GameCard({
  title,
  titleImage,
  releaseDate,
  genre,
  rating,
  overview,
  onAdd,
  buttonLabel,
}: GameCardProps) {
  return (
    <BaseCard
      title={title}
      titleImage={titleImage}
      onAdd={onAdd}
      buttonLabel={buttonLabel}
      imageFit="cover"
      imageHeight={180}
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
          {genre ?? "Unknown"}
        </Badge>
      </Group>
      <Group gap={4} wrap="wrap" style={{ flex: 1 }}>
        {overview &&
          overview.split(", ").map((platform) => (
            <Badge key={platform} variant="outline" color="gray" size="xs">
              {platform}
            </Badge>
          ))}
      </Group>
    </BaseCard>
  );
}
