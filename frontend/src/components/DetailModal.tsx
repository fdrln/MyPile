import {
  Modal,
  Image,
  Text,
  Badge,
  Group,
  Stack,
  Loader,
  Divider,
  SimpleGrid,
  Button,
} from "@mantine/core";
import { useMediaDetail } from "../hooks/useMediaDetail";
import { ACCENT_COLOR } from "../constants/theme";

interface DetailModalProps {
  opened: boolean;
  onClose: () => void;
  category: string | null;
  externalId: number | null;
  openLibraryKey?: string;
  onAction?: () => void;
  actionLabel?: string;
}

function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DetailModal({
  opened,
  onClose,
  category,
  externalId,
  openLibraryKey,
  onAction,
  actionLabel,
}: DetailModalProps) {
  const { detail, isLoading } = useMediaDetail(
    opened ? category : null,
    opened ? externalId : null,
    openLibraryKey,
  );

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      radius="lg"
      title={detail?.title ?? "Loading..."}
    >
      {isLoading || !detail ? (
        <Group justify="center" p="xl">
          <Loader color={ACCENT_COLOR} />
        </Group>
      ) : (
        <Stack gap="md">
          {detail.posterPath || detail.backdropPath ? (
            <Image
              src={detail.posterPath ?? detail.backdropPath}
              alt={detail.title}
              radius="md"
              mah={400}
              fit="contain"
              style={{ background: "#111" }}
            />
          ) : null}

          {detail.tagline && (
            <Text c="dimmed" fs="italic" size="sm">
              {detail.tagline}
            </Text>
          )}

          <Group gap="xs">
            {detail.rating && detail.rating > 0 && (
              <Badge color={ACCENT_COLOR} variant="filled">
                ★ {detail.rating.toFixed(1)}
                {detail.voteCount && (
                  <Text span c="dimmed" size="xs" ml={4}>
                    ({detail.voteCount.toLocaleString()})
                  </Text>
                )}
              </Badge>
            )}
            {detail.metacritic && (
              <Badge color="green" variant="filled">
                MC {detail.metacritic}
              </Badge>
            )}
            {detail.releaseDate && (
              <Badge variant="filled" color="dark">
                {detail.releaseDate.substring(0, 4)}
              </Badge>
            )}
            {detail.runtime && (
              <Badge variant="filled" color="dark">
                {formatRuntime(detail.runtime)}
              </Badge>
            )}
            {detail.status && (
              <Badge variant="outline" color="gray">
                {detail.status}
              </Badge>
            )}
          </Group>

          {detail.genres && detail.genres.length > 0 && (
            <Group gap="xs">
              {detail.genres.map((genre) => (
                <Badge key={genre} variant="light" color="gray" size="sm">
                  {genre}
                </Badge>
              ))}
            </Group>
          )}

          {(detail.overview || detail.descriptionRaw) && (
            <>
              <Divider />
              <Text size="sm" style={{ lineHeight: 1.7 }}>
                {detail.descriptionRaw ?? detail.overview}
              </Text>
            </>
          )}

          <Divider />

          <SimpleGrid cols={2} spacing="xs">
            {detail.numberOfSeasons && (
              <>
                <Text size="xs" c="dimmed">
                  Seasons
                </Text>
                <Text size="xs">{detail.numberOfSeasons}</Text>
              </>
            )}
            {detail.numberOfEpisodes && (
              <>
                <Text size="xs" c="dimmed">
                  Episodes
                </Text>
                <Text size="xs">{detail.numberOfEpisodes}</Text>
              </>
            )}
            {detail.createdBy && detail.createdBy.length > 0 && (
              <>
                <Text size="xs" c="dimmed">
                  Created by
                </Text>
                <Text size="xs">{detail.createdBy.join(", ")}</Text>
              </>
            )}
            {detail.networks && detail.networks.length > 0 && (
              <>
                <Text size="xs" c="dimmed">
                  Network
                </Text>
                <Text size="xs">{detail.networks.join(", ")}</Text>
              </>
            )}
            {detail.lastAirDate && (
              <>
                <Text size="xs" c="dimmed">
                  Last aired
                </Text>
                <Text size="xs">{formatDate(detail.lastAirDate)}</Text>
              </>
            )}
            {detail.playtime && (
              <>
                <Text size="xs" c="dimmed">
                  Avg. playtime
                </Text>
                <Text size="xs">~{detail.playtime} hours</Text>
              </>
            )}
            {detail.esrbRating && (
              <>
                <Text size="xs" c="dimmed">
                  ESRB
                </Text>
                <Text size="xs">{detail.esrbRating}</Text>
              </>
            )}
            {detail.developers && detail.developers.length > 0 && (
              <>
                <Text size="xs" c="dimmed">
                  Developer
                </Text>
                <Text size="xs">{detail.developers.join(", ")}</Text>
              </>
            )}
            {detail.platforms && detail.platforms.length > 0 && (
              <>
                <Text size="xs" c="dimmed">
                  Platforms
                </Text>
                <Text size="xs">{detail.platforms.join(", ")}</Text>
              </>
            )}
            {detail.firstPublishDate && (
              <>
                <Text size="xs" c="dimmed">
                  First published
                </Text>
                <Text size="xs">{detail.firstPublishDate}</Text>
              </>
            )}
          </SimpleGrid>

          {detail.subjects && detail.subjects.length > 0 && (
            <>
              <Divider />
              <Group gap="xs">
                {detail.subjects.map((subject) => (
                  <Badge key={subject} variant="light" color="gray" size="sm">
                    {subject}
                  </Badge>
                ))}
              </Group>
            </>
          )}

          {onAction && (
            <>
              <Divider />
              <Button
                color={ACCENT_COLOR}
                variant="light"
                fullWidth
                radius="xl"
                fw={500}
                onClick={onAction}
              >
                {actionLabel ?? "+ Add to pile"}
              </Button>
            </>
          )}
        </Stack>
      )}
    </Modal>
  );
}
