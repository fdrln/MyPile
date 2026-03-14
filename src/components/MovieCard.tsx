import { Badge, Card, Image, Text } from "@mantine/core";

interface MovieCardProps {
  title: string;
  releaseDate: string;
  genre: number;
  titleImage: string;
}

export default function MovieCard({
  title,
  releaseDate,
  genre,
  titleImage,
}: MovieCardProps) {
  return (
    <Card withBorder radius="md">
      <Image src={titleImage} alt={title} height={300} />
      <Text>{title}</Text>
      <Badge>{releaseDate}</Badge>
      <Badge>{genre}</Badge>
    </Card>
  );
}
