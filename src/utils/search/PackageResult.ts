import { stringSimilarity } from "string-similarity-js";
export type PackageResult = {
  ecosystem: string;
  name: string;
};

export function sortByName(query: string) {
  const queryLower = query.toLowerCase();
  return (a: PackageResult, b: PackageResult) => {
    const scoreA = stringSimilarity(queryLower, a.name.toLowerCase());
    const scoreB = stringSimilarity(queryLower, b.name.toLowerCase());
    return scoreB - scoreA || a.name.localeCompare(b.name);
  };
}
