import { useState, useEffect } from "react";
import { BACKEND_BASE } from "../constants/api";
import type { MediaDetail } from "../types/MediaDetail";

export function useMediaDetail(
  category: string | null,
  id: number | null,
  openLibraryKey?: string,
) {
  const [detail, setDetail] = useState<MediaDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!category || id === null) return;

    const url =
      category === "books"
        ? `${BACKEND_BASE}/search/detail/books?key=${openLibraryKey}`
        : `${BACKEND_BASE}/search/detail/${category}/${id}`;

    const controller = new AbortController();
    setIsLoading(true);
    setDetail(null);

    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: MediaDetail) => {
        setDetail(data);
        setIsLoading(false);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setIsLoading(false);
      });

    return () => controller.abort();
  }, [category, id, openLibraryKey]);

  return { detail, isLoading };
}
