import type { CategoryId } from "../constants/categories";
import { useState, useEffect } from "react";
import { BACKEND_BASE } from "../constants/api";
import type { MediaSearchResult } from "../types/MediaSearchResult";

export function useMediaSearch(
  category: CategoryId | null,
  searchQuery: string,
) {
  const [results, setResults] = useState<MediaSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!category) {
      setResults([]);
      return;
    }

    const url = searchQuery
      ? `${BACKEND_BASE}/search/${category}?q=${encodeURIComponent(searchQuery)}`
      : `${BACKEND_BASE}/search/${category}`;

    const timeout = setTimeout(
      () => {
        setIsLoading(true);
        fetch(url)
          .then((res) => res.json())
          .then((data: MediaSearchResult[]) => {
            setResults(data);
            setIsLoading(false);
          })
          .catch(() => {
            setResults([]);
            setIsLoading(false);
          });
      },
      searchQuery ? 500 : 0,
    );

    return () => clearTimeout(timeout);
  }, [searchQuery, category]);

  return { results, isLoading };
}
