import { toast } from "react-toastify";
import { stringSimilarity } from "string-similarity-js";

interface PyPIPackageResult {
  name: string;
  package_manager_url: string;
}

function calculateRelevanceScore(query: string, packageName: string): number {
  const normalizedQuery = query.toLowerCase();
  const normalizedPackageName = packageName.toLowerCase();

  const score = stringSimilarity(normalizedQuery, normalizedPackageName);

  return score;
}

export default async function searchPyPIPackages(
  query: string,
): Promise<PyPIPackageResult[]> {
  try {
    const response = await fetch("https://pypi.org/simple/", {
      headers: { Accept: "application/vnd.pypi.simple.v1+json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const projects = Array.isArray(data.projects) ? data.projects : [];
    if (projects.length === 0) {
      toast.warn("No projects found.");
      return [];
    }

    const queryLower = query.toLowerCase();
    const filteredResults = projects.filter((pkg: { name: string }) =>
      pkg.name.toLowerCase().includes(queryLower),
    );

    const results: PyPIPackageResult[] = filteredResults
      .sort((a: { name: string }, b: { name: string }) => {
        const scoreA = calculateRelevanceScore(query, a.name);
        const scoreB = calculateRelevanceScore(query, b.name);
        return scoreB - scoreA || a.name.localeCompare(b.name);
      })
      .slice(0, 10)
      .map((pkg: { name: string }) => ({
        name: pkg.name,
        package_manager_url: `https://pypi.org/project/${pkg.name}/`,
      }));

    return results;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    toast.error(`Failed to fetch PyPI packages: ${errorMessage}`);
    return [];
  }
}
