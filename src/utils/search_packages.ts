"use server";

import searchPyPIPackages from "./search_pypi";
import searchCondaForgePackages from "./search_conda";
import searchNpmPackages from "./search_npm";

export type PackageResult = {
  ecosystem: string;
  name: string;
  url: string;
};

export default async function search_packages(
  query: string,
  ecosystem: string,
): Promise<PackageResult[]> {
  if (ecosystem === "pypi") {
    const pypiResults = await searchPyPIPackages(query);
    return pypiResults.map((pkg) => ({
      ecosystem: "pypi",
      name: pkg.name,
      url: pkg.package_manager_url,
    }));
  }

  if (ecosystem === "conda") {
    const condaResults = await searchCondaForgePackages(query);
    return condaResults.map((pkg) => ({
      ecosystem: "conda-forge",
      name: pkg.name,
      version: pkg.latestVersion,
      url: pkg.url,
    }));
  }

  if (ecosystem === "npm") {
    const npmResults = await searchNpmPackages(query);
    return npmResults.map((pkg) => ({
      ecosystem: "npm",
      name: pkg.name,
      version: pkg.version,
      url: pkg.apiUrl,
    }));
  }

  return [];
}
