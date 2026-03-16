import { AppShell, AppShellMain } from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import AddModal from "./components/AddModal";
import MoviesPage from "./pages/MoviesPage";
import TVPage from "./pages/TVPage";
import GamesPage from "./pages/GamesPage";
import BooksPage from "./pages/BooksPage";
import { useState } from "react";

export default function App() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [opened, { open, close }] = useDisclosure(false);
  const [refreshPile, setRefreshPile] = useState(0);

  return (
    <AppShell header={!isMobile ? { height: 100 } : undefined}>
      <Navigation isMobile={isMobile ?? false} onAddClick={open} />
      <AddModal
        opened={opened}
        onClose={close}
        onItemAdded={() => setRefreshPile((prev) => prev + 1)}
      />
      <AppShellMain>
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route
            path="/movies"
            element={<MoviesPage refreshPile={refreshPile} />}
          />
          <Route path="/tv" element={<TVPage refreshPile={refreshPile} />} />

          <Route path="/games" element={<GamesPage />} />
          <Route path="/books" element={<BooksPage />} />
        </Routes>
      </AppShellMain>
    </AppShell>
  );
}
