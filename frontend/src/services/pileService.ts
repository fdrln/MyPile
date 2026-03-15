const API_BASE = "http://localhost:8080/api";

export interface MoviePileItem {
  id?: number;
  externalId: number;
  title: string;
  imageUrl: string;
  genre: number;
  rating?: number;
  overview: string;
  releaseDate: string;
  addedAt?: string;
}

export async function getMovies() {
  const res = await fetch(`${API_BASE}/movies`);
  return await res.json();
}

export async function addMovie(movie: MoviePileItem) {
  const res = await fetch(`${API_BASE}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  return await res.json();
}

export async function deleteMovie(id: number) {
  await fetch(`${API_BASE}/movies/${id}`, {
    method: "DELETE",
  });
}
