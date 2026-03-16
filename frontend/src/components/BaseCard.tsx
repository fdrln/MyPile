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
      radius="xl"
      p={0}
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(34, 31, 30, 0.8)",
        overflow: "hidden",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 12px 40px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <CardSection>
        <Image
          src={titleImage}
          alt={title}
          fit="contain"
          style={{
            objectPosition: "top",
            background: "#111",
            width: "100%",
          }}
          fallbackSrc="https://placehold.co/200x300?text=No+Image"
        />
      </CardSection>
      <div
        style={{
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
        }}
      >
        {children}
        <Button
          color={ACCENT_COLOR}
          variant="light"
          size="xs"
          fullWidth
          mt={4}
          radius="xl"
          onClick={onAdd}
          style={{ fontWeight: 500 }}
        >
          + Add to pile
        </Button>
      </div>
    </Card>
  );
}
