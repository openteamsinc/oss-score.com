import React from "react";
import search_packages, { PackageResult } from "@/utils/search_packages";
import { debounce } from "lodash";

const debouncedFetchPackages = debounce(
  async (query, setPackages, setLoading) => {
    if (query.trim().length >= 3) {
      const results = await search_packages(query);
      setPackages(results);
    } else {
      setPackages([]);
    }
    setLoading(false);
  },
  300,
); // 300ms delay

export default function useSearchPackages(query: string) {
  const [packages, setPackages] = React.useState<PackageResult[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);
    debouncedFetchPackages(query, setPackages, setLoading);
    return () => {
      debouncedFetchPackages.cancel();
    };
  }, [query]);

  return { packages, loading };
}
