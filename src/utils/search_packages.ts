"use server";

import searchPyPIPackages from "./search_pypi";
import searchCondaForgePackages from "./search_conda";
import searchNpmPackages from "./search_npm";

export type PackageResult = {
  ecosystem: string;
  name: string;
  url: string;
  version?: string;
};

export default async function search_packages(
  query: string,
  ecosystem: string,
): Promise<PackageResult[]> {
  let data: PackageResult[] = [];

  if (ecosystem === "pypi") {
    const pypiResults = await searchPyPIPackages(query.toLowerCase());
    data = pypiResults.map((pkg) => ({
      ecosystem: "pypi",
      name: pkg.name,
      url: pkg.package_manager_url,
    }));
  }

  if (ecosystem === "conda") {
    const condaResults = await searchCondaForgePackages(query.toLowerCase());
    data = condaResults.map((pkg) => ({
      ecosystem: "conda-forge",
      name: pkg.full_name,
      version: pkg.latestVersion,
      url: pkg.url,
    }));
  }

  if (ecosystem === "npm") {
    const npmResults = await searchNpmPackages(query.toLowerCase());
    data = npmResults.map((pkg) => ({
      ecosystem: "npm",
      name: pkg.name,
      version: pkg.version,
      url: pkg.apiUrl,
    }));
  }

  return data;
}
