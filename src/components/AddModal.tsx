import {
  Modal,
  SimpleGrid,
  Stack,
  Button,
  Text,
  TextInput,
  ActionIcon,
  Group,
} from "@mantine/core";
import { CATEGORIES, type CategoryId } from "../constants/categories";
import { useState } from "react";
import { ACCENT_COLOR } from "../constants/theme";
import { IconArrowLeft } from "@tabler/icons-react";
import { useMediaSearch } from "../hooks/useMediaSearch";

interface AddModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function AddModal({ opened, onClose }: AddModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const { results } = useMediaSearch(selectedCategory, searchQuery);

  const handleClose = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      centered
      title={
        selectedCategory === null
          ? "Add to Pile"
          : `Add ${CATEGORIES.find((c) => c.id === selectedCategory)?.label}`
      }
    >
      {selectedCategory === null ? (
        <SimpleGrid cols={2}>
          {CATEGORIES.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant="outline"
              color={ACCENT_COLOR}
              h={120}
              w="100%"
            >
              <Stack align="center" gap="xs">
                <Text>{category.label}</Text>
                {category.icon}
              </Stack>
            </Button>
          ))}
        </SimpleGrid>
      ) : (
        <Stack>
          <Group>
            <ActionIcon
              onClick={() => setSelectedCategory(null)}
              variant="subtle"
            >
              <IconArrowLeft />
            </ActionIcon>
            <Text fw={500}>
              {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
            </Text>
          </Group>
          <TextInput
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Stack>
            {results.map((result) => (
              <Text key={result.id}>{result.title}</Text>
            ))}
          </Stack>
        </Stack>
      )}
    </Modal>
  );
}
