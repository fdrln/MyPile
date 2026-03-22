export interface MediaDetail {
  id: number;
  title: string;
  tagline?: string;
  overview: string;
  posterPath?: string;
  backdropPath?: string;
  rating?: number;
  voteCount?: number;
  releaseDate?: string;
  status?: string;
  genres?: string[];

  // Movies
  runtime?: number;

  // TV
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  createdBy?: string[];
  networks?: string[];
  lastAirDate?: string;

  // Games
  descriptionRaw?: string;
  playtime?: number;
  esrbRating?: string;
  developers?: string[];
  platforms?: string[];
  metacritic?: number;

  // Books
  description?: string;
  authors?: string[];
  subjects?: string[];
  firstPublishDate?: string;
  coverIds?: number[];
}
