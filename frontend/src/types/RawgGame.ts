export interface RAWGGame {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number | null;
  genres: { id: number; name: string }[];
  parent_platforms: { platform: { id: number; name: string } }[];
}
