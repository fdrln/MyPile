export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: string[];
}

export interface OpenLibraryResponse {
  docs: OpenLibraryBook[];
}

export interface OpenLibraryTrendingResponse {
  works: OpenLibraryBook[];
}
