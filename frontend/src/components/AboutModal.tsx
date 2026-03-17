import { Modal, Text, Anchor, Stack, Image, Divider } from "@mantine/core";
import tmdbLogo from "../assets/tmdb.svg";

interface AboutModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function AboutModal({ opened, onClose }: AboutModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="About MyPile" centered>
      <Stack gap="md">
        <Text size="sm">
          MyPile is a personal tracker for movies, TV shows, games and books.
        </Text>

        <Divider label="Data Sources" labelPosition="left" />

        <Stack gap="xs">
          <Image src={tmdbLogo} w={120} />
          <Text size="xs" c="dimmed">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </Text>
          <Anchor href="https://www.themoviedb.org" target="_blank" size="xs">
            themoviedb.org
          </Anchor>
        </Stack>

        <Stack gap="xs">
          <Text fw={500} size="sm">
            RAWG
          </Text>
          <Text size="xs" c="dimmed">
            Game data provided by RAWG.
          </Text>
          <Anchor href="https://rawg.io" target="_blank" size="xs">
            rawg.io
          </Anchor>
        </Stack>

        <Stack gap="xs">
          <Text fw={500} size="sm">
            Open Library
          </Text>
          <Text size="xs" c="dimmed">
            Book data provided by Open Library.
          </Text>
          <Anchor href="https://openlibrary.org" target="_blank" size="xs">
            openlibrary.org
          </Anchor>
        </Stack>

        <Divider />
      </Stack>
    </Modal>
  );
}
