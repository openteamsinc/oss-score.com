import memoize from "memoizee";
import { PackageResult, sortByName } from "./PackageResult";

async function fetchPyPIProjects(): Promise<PackageResult[]> {
  const response = await fetch("https://pypi.org/simple/", {
    headers: { Accept: "application/vnd.pypi.simple.v1+json" },
    //  too big for nextjs cache use memoizee instead
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.projects.map(({ name }: { name: string }) => ({
    ecosystem: "pypi",
    name,
  }));
}

const memoizedPyPIProjects = memoize(fetchPyPIProjects, {
  promise: true,
  maxAge: 1000 * 60 * 60,
  preFetch: true,
});

memoizedPyPIProjects();

export default async function searchPyPIPackages(
  query: string,
  limit: number = 10,
): Promise<PackageResult[]> {
  const projects = await memoizedPyPIProjects();
  if (projects.length === 0) return [];

  const queryLower = query.toLowerCase();
  return projects
    .filter((pkg) => pkg.name.toLowerCase().includes(queryLower))
    .sort(sortByName(queryLower))
    .slice(0, limit);
}
