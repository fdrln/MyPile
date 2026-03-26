import { BACKEND_BASE } from "../constants/api";
import type { CategoryId } from "../constants/categories";
import type { MediaSearchResult } from "../types/MediaSearchResult";

const API_BASE = `${BACKEND_BASE}/pile`;

export interface PileItem {
  id?: number;
  externalId: number;
  title: string;
  imageUrl: string;
  genre: string;
  rating?: number;
  overview: string;
  addedAt?: string;
}
export interface MoviePileItem extends PileItem {
  releaseDate: string;
}

export interface TVPileItem extends PileItem {
  firstAirDate: string;
}

export interface GamePileItem extends PileItem {
  releaseDate: string;
  metacritic?: number;
  platforms?: string;
}

export interface BookPileItem extends PileItem {
  author?: string;
  publishYear?: string;
  openLibraryKey?: string;
}

export function buildPileItem(
  result: MediaSearchResult,
  category: CategoryId,
): MoviePileItem | TVPileItem | GamePileItem | BookPileItem {
  const base = {
    externalId: result.id,
    title: result.title,
    imageUrl: result.titleImage,
    genre: result.genre,
    rating: result.rating,
    overview: result.overview,
  };

  switch (category) {
    case "tv":
      return { ...base, firstAirDate: result.releaseDate } as TVPileItem;
    case "games":
      return {
        ...base,
        releaseDate: result.releaseDate,
        metacritic: result.metacritic ?? null,
        platforms: result.overview,
      } as GamePileItem;
    case "books":
      return {
        ...base,
        author: result.overview,
        publishYear: result.releaseDate,
        openLibraryKey: result.openLibraryKey,
      } as BookPileItem;
    default:
      return { ...base, releaseDate: result.releaseDate } as MoviePileItem;
  }
}

export async function getItems(category: string) {
  const res = await fetch(`${API_BASE}/${category}`);
  return await res.json();
}

export async function addItem(category: string, item: PileItem) {
  const res = await fetch(`${API_BASE}/${category}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  if (res.status === 409) {
    return null;
  }
  return res.json();
}

export async function deleteItem(category: string, id: number) {
  await fetch(`${API_BASE}/${category}/${id}`, {
    method: "DELETE",
  });
}
