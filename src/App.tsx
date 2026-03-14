import { AppShell, AppShellMain } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import MoviesPage from "./pages/MoviesPage";
import TVPage from "./pages/TVPage";
import GamesPage from "./pages/GamesPage";
import BooksPage from "./pages/BooksPage";

export default function App() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <AppShell header={!isMobile ? { height: 60 } : undefined}>
      <Navigation isMobile={isMobile ?? false} />
      <AppShellMain>
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tv" element={<TVPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/books" element={<BooksPage />} />
        </Routes>
      </AppShellMain>
    </AppShell>
  );
}
