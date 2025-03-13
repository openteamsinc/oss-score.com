import memoize from "memoizee";
import { PackageResult, sortByName } from "./PackageResult";

export type CondaApiPackage = {
  name: string;
  latestVersion: string;
  url: string;
  owner: string;
};

async function fetchCondaPackages(channel: string): Promise<PackageResult[]> {
  const searchUrl = `https://conda.anaconda.org/${channel}/linux-64/repodata.json`;

  const response = await fetch(searchUrl, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const values: { name: string }[] = Object.values(data.packages);
  const names = values.map(({ name }) => name);
  const uniqueNames = [...new Set(names)];

  return uniqueNames.map((name) => ({
    name: `${name}`,
    fullName: `${channel}/${name}`,
    ecosystem: "conda",
  }));
}
const memoizedCondaPackages = memoize(fetchCondaPackages, {
  promise: true,
  maxAge: 1000 * 60 * 60,
  preFetch: true,
});

export default async function searchCondaPackages(
  query: string,
  limit: number = 10,
): Promise<PackageResult[]> {
  const condaPkgs = await memoizedCondaPackages("conda-forge");
  if (condaPkgs.length === 0) return [];

  const queryLower = query.toLowerCase();
  return condaPkgs
    .filter((pkg) => pkg.name.toLowerCase().includes(queryLower))
    .sort(sortByName(queryLower))
    .slice(0, limit);
}
