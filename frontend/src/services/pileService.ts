import { BACKEND_BASE } from "../constants/api";

const API_BASE = `${BACKEND_BASE}/pile`;

export interface PileItem {
  id?: number;
  externalId: number;
  title: string;
  imageUrl: string;
  genre: number | string;
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
  return await res.json();
}

export async function deleteItem(category: string, id: number) {
  await fetch(`${API_BASE}/${category}/${id}`, {
    method: "DELETE",
  });
}
