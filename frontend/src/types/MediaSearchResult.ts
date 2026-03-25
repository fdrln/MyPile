export interface MediaSearchResult {
  id: number;
  title: string;
  overview: string;
  rating?: number;
  releaseDate: string;
  genre: string;
  titleImage: string;
  metacritic?: number;
  openLibraryKey?: string;
}
