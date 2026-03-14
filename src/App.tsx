import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Group,
  Title,
} from "@mantine/core";
import { Routes, Route, Link } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage";
import TVPage from "./pages/TVPage";
import GamesPage from "./pages/GamesPage";
import BooksPage from "./pages/BooksPage";

export default function App() {
  return (
    <AppShell header={{ height: 60 }}>
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

      <AppShellMain>
        <Routes>
          <Route path="/" element={<MoviesPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tv" element={<TVPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/books" element={<BooksPage />} />
        </Routes>
      </AppShellMain>
    </AppShell>
  );
}
