import { AppShellFooter, AppShellHeader, Group, Title } from "@mantine/core";
import { Link } from "react-router-dom";

interface NavigationProps {
  isMobile: boolean;
}

export default function Navigation({ isMobile }: NavigationProps) {
  return isMobile ? (
    <AppShellFooter>
      <Group justify="center" h="100%">
        <Link to="/movies">Movies</Link>
        <Link to="/tv">TV</Link>
        <Link to="/games">Games</Link>
        <Link to="/books">Books</Link>
      </Group>
    </AppShellFooter>
  ) : (
    <AppShellHeader>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          height: "100%",
          padding: "0 16px",
        }}
      >
        <Title>MyPile</Title>
        <Group>
          <Link to="/movies">Movies</Link>
          <Link to="/tv">TV</Link>
          <Link to="/games">Games</Link>
          <Link to="/books">Books</Link>
        </Group>
        <div />
      </div>
    </AppShellHeader>
  );
}
