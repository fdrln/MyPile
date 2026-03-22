import { Card, CardSection, Image, Button } from "@mantine/core";
import { ACCENT_COLOR } from "../constants/theme";
import styles from "./BaseCard.module.css";

interface BaseCardProps {
  title: string;
  titleImage: string;
  onAction: () => void;
  onImageClick?: () => void;
  children: React.ReactNode;
  buttonLabel?: string;
  imageFit?: "cover" | "contain";
  imageHeight?: number;
}

export default function BaseCard({
  title,
  titleImage,
  onAction,
  onImageClick,
  children,
  buttonLabel = "+ Add to pile",
  imageFit = "contain",
  imageHeight,
}: BaseCardProps) {
  return (
    <Card radius="xl" p={0} className={styles.card}>
      <CardSection
        style={
          imageHeight ? { height: imageHeight, overflow: "hidden" } : undefined
        }
        onClick={onImageClick}
        className={onImageClick ? styles.imageClickable : undefined}
      >
        <Image
          src={titleImage}
          alt={title}
          height={imageHeight}
          fit={imageFit}
          className={styles.image}
          fallbackSrc="https://placehold.co/200x300?text=No+Image"
        />
      </CardSection>
      <div className={styles.content}>
        {children}
        <Button
          color={ACCENT_COLOR}
          variant="light"
          size="xs"
          fullWidth
          mt={4}
          radius="xl"
          fw={500}
          onClick={onAction}
        >
          {buttonLabel}
        </Button>
      </div>
    </Card>
  );
}
