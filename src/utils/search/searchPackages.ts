"use server";

import searchCondaPackages from "./conda";
import searchNpmPackages from "./npm";
import { PackageResult, sortByName } from "./PackageResult";
import searchPyPIPackages from "./pypi";

export default async function searchPackages(
  ecosystem: string | null,
  query: string,
  limit: number = 10,
): Promise<PackageResult[]> {
  const pypiPackages = searchPyPIPackages(query, limit);
  const npmPackages = searchNpmPackages(query, limit);
  const condaPackages = searchCondaPackages(query, limit);

  const packages = (
    await Promise.all([pypiPackages, npmPackages, condaPackages])
  ).flat(1);
  console.log(packages);
  return packages.sort(sortByName(query)).slice(0, limit);
}
