interface PyPIPackageResult {
  name: string;
  package_manager_url: string;
}

let cachedData: { projects: { name: string }[] } = { projects: [] };

async function fetchPyPIProjects(): Promise<{ projects: { name: string }[] }> {
  if (cachedData.projects.length > 0) {
    return cachedData;
  }

  const response = await fetch("https://pypi.org/simple/", {
    headers: { Accept: "application/vnd.pypi.simple.v1+json" },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  cachedData = await response.json();
  return cachedData;
}

function calculateRelevanceScore(query: string, packageName: string): number {
  const normalizedQuery = query.toLowerCase();
  const normalizedPackageName = packageName.toLowerCase();

  if (normalizedQuery === normalizedPackageName) {
    return 1;
  } else if (normalizedPackageName.startsWith(normalizedQuery)) {
    return 0.9;
  } else if (normalizedPackageName.includes(normalizedQuery)) {
    const position = normalizedPackageName.indexOf(normalizedQuery);
    return 0.7 - position * 0.01;
  }

  const lengthPenalty =
    Math.abs(normalizedPackageName.length - normalizedQuery.length) * 0.01;
  return Math.max(0, 0.5 - lengthPenalty);
}

export default async function searchPyPIPackages(
  query: string,
): Promise<PyPIPackageResult[]> {
  try {
    const data = await fetchPyPIProjects();

    const filteredResults = data.projects.filter((pkg: { name: string }) =>
      pkg.name.toLowerCase().includes(query.toLowerCase()),
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
    console.error("Error fetching PyPI packages:", error);
    return [];
  }
}
