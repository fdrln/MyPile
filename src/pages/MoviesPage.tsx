import { Stack, Title } from "@mantine/core";

export default function MoviesPage() {
  return (
    <Stack>
      <Title order={2}>My Movies</Title>
      <Title order={3}>Trending</Title>
    </Stack>
  );
}
