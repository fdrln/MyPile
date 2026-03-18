import { Text, Title } from "@mantine/core";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div>
      <Text
        size="xs"
        tt="uppercase"
        c="dimmed"
        fw={600}
        className={styles.label}
      >
        Your Collection
      </Text>
      <Title order={1} className={styles.title}>
        {title}
      </Title>
    </div>
  );
}
