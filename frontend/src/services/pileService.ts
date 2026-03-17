const API_BASE = "http://localhost:8080/api/pile";

export interface PileItem {
  id?: number;
  externalId: number;
  title: string;
  imageUrl: string;
  genre: number;
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

export async function getItems(category: string) {
  const res = await fetch(`${API_BASE}/${category}`);
  return await res.json();
}

export async function addItem(category: string, item: PileItem) {
  const res = await fetch(`${API_BASE}/${category}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item), // ← serialize the item, not category
  });
  return await res.json();
}

export async function deleteItem(category: string, id: number) {
  await fetch(`${API_BASE}/${category}/${id}`, {
    method: "DELETE",
  });
}
