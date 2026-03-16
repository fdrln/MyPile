import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter } from "react-router-dom";
import { GenreProvider } from "./context/GenreContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider
        defaultColorScheme="auto"
        theme={{
          primaryColor: "brand",
          colors: {
            brand: [
              "#FFE8E8",
              "#FFCFCF",
              "#FFB5B5",
              "#FF9C9C",
              "#FF8383",
              "#E8634A",
              "#CC5540",
              "#B24737",
              "#99392D",
              "#802B22",
            ],
          },
          fontFamily: "'Inter', sans-serif",
          headings: {
            fontFamily: "'Lora', serif",
            fontWeight: "700",
          },
          radius: {
            md: "12px",
            lg: "16px",
            xl: "24px",
          },
        }}
      >
        <GenreProvider>
          <App />
        </GenreProvider>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
);
