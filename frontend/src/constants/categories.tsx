import {
  IconMovie,
  IconDeviceTvOld,
  IconDeviceGamepad2,
  IconBook,
} from "@tabler/icons-react";
import { type ReactNode } from "react";

export type CategoryId = "movies" | "tv" | "games" | "books";

export interface Category {
  id: CategoryId;
  label: string;
  icon: ReactNode;
}

export const CATEGORIES: Category[] = [
  { id: "movies", label: "Movies", icon: <IconMovie size={48} /> },
  { id: "tv", label: "TV Shows", icon: <IconDeviceTvOld size={48} /> },
  { id: "games", label: "Games", icon: <IconDeviceGamepad2 size={48} /> },
  { id: "books", label: "Books", icon: <IconBook size={48} /> },
];
