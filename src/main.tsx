import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider
        defaultColorScheme="dark"
        theme={{
          primaryColor: "brand",
          colors: {
            brand: [
              "#FFE8E8",
              "#FFCFCF",
              "#FFB5B5",
              "#FF9C9C",
              "#FF8383",
              "#FF6B6B",
              "#E55F5F",
              "#CC5454",
              "#B24848",
              "#993D3D",
            ],
          },
        }}
      >
        <App />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
);
