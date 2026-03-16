export interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  genre_ids: number[];
  poster_path: string;
}
