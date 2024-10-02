import React from "react";
import search_packages, { PackageResult } from "@/utils/search_packages";
import { debounce } from "lodash";

const debouncedFetchPackages = debounce(
  async (query, setPackages, setLoading, controller) => {
    if (query.trim().length >= 3) {
      try {
        const results = await search_packages(query, controller.signal); // Pass signal here
        setPackages(results);
      } catch (error) {
        // Type check before accessing error properties
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Fetch aborted for query:", query);
        } else if (error instanceof Error) {
          console.error("Error fetching packages:", error.message);
        } else {
          console.error("Unknown error occurred:", error);
        }
      }
    } else {
      setPackages([]);
    }
    setLoading(false);
  },
  200,
);

const cache = new Map();

export default function useSearchPackages(query: string) {
  const [packages, setPackages] = React.useState<PackageResult[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    if (cache.has(query)) {
      setPackages(cache.get(query));
      setLoading(false);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);

    debouncedFetchPackages(
      query,
      (result: PackageResult[]) => {
        setPackages(result);
        cache.set(query, result);
      },
      setLoading,
      controller,
    );

    return () => {
      debouncedFetchPackages.cancel();
      controller.abort();
    };
  }, [query]);

  return { packages, loading };
}
