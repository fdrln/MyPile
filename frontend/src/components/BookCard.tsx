import { Badge, Group, Text } from "@mantine/core";
import BaseCard from "./BaseCard";

interface BookCardProps {
  title: string;
  titleImage: string;
  author: string;
  publishYear: string;
  genre: number | string;
  onAction: () => void;
  onImageClick?: () => void;
  buttonLabel?: string;
}

export default function BookCard({
  title,
  titleImage,
  author,
  publishYear,
  genre,
  onAction,
  onImageClick,
  buttonLabel,
}: BookCardProps) {
  return (
    <BaseCard
      title={title}
      titleImage={titleImage}
      onAction={onAction}
      onImageClick={onImageClick}
      buttonLabel={buttonLabel}
      imageFit="cover"
      imageHeight={220}
    >
      <Text fw={500} size="sm" truncate="end">
        {title}
      </Text>
      <Text size="xs" c="dimmed" truncate="end">
        {author ?? "Unknown author"}
      </Text>
      <Group gap={6}>
        <Badge variant="filled" color="dark" size="sm">
          {publishYear ?? "N/A"}
        </Badge>
        <Badge variant="filled" color="dark" size="sm">
          {genre ?? "Unknown"}
        </Badge>
      </Group>
    </BaseCard>
  );
}
