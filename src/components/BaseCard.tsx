import { Card, CardSection, Image, Button } from "@mantine/core";
import { ACCENT_COLOR } from "../constants/theme";

interface BaseCardProps {
  title: string;
  titleImage: string;
  onAdd: () => void;
  children: React.ReactNode;
}

export default function BaseCard({
  title,
  titleImage,
  onAdd,
  children,
}: BaseCardProps) {
  return (
    <Card
      withBorder
      radius="md"
      p={0}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <CardSection>
        <Image
          src={titleImage}
          alt={title}
          height={400}
          fit="cover"
          style={{ objectPosition: "top" }}
          fallbackSrc="https://placehold.co/200x300?text=No+Image"
        />
      </CardSection>
      <div
        style={{
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          flex: 1,
        }}
      >
        {children}
        <Button
          color={ACCENT_COLOR}
          variant="filled"
          size="xs"
          fullWidth
          mt={4}
          onClick={onAdd}
        >
          + Add to pile
        </Button>
      </div>
    </Card>
  );
}
