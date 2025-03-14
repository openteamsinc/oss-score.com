import React from "react";
import searchPackages from "@/utils/search/searchPackages";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import { PackageResult } from "@/utils/search/PackageResult";

export default function useSearchPackages(
  ecosystem: string | null,
  query: string,
) {
  const [packages, setPackages] = React.useState<PackageResult[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchPackages = React.useCallback(
    debounce(async (ecosystem: string | null, searchQuery: string) => {
      if (searchQuery.trim().length >= 3) {
        try {
          const results = await searchPackages(ecosystem, searchQuery);
          setPackages(results);
        } catch (error) {
          console.error("Error fetching packages:", error);
          toast.error("Error fetching packages for search");
        }
      } else {
        setPackages([]);
      }
      setLoading(false);
    }, 300),
    [],
  );

  React.useEffect(() => {
    setLoading(true);
    debouncedFetchPackages(ecosystem, query);

    return () => {
      debouncedFetchPackages.cancel();
    };
  }, [query, debouncedFetchPackages, ecosystem]);

  return { packages, loading };
}
