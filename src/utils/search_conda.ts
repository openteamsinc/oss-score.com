import axios from "axios";

export type CondaPackageResult = {
  name: string;
  latestVersion: string;
  url: string;
  owner: string;
};

type CondaApiPackage = {
  full_name: string;
  version: string;
  owner: string;
  name: string;
};

export default async function searchCondaForgePackages(
  query: string,
): Promise<CondaPackageResult[]> {
  const searchUrl = `https://api.anaconda.org/search`;

  try {
    const response = await axios.get(searchUrl, {
      params: {
        name: query,
        channel: "conda-forge",
      },
    });

    const results: CondaPackageResult[] = response.data
      .map((pkg: CondaApiPackage) => ({
        name: pkg.full_name,
        latestVersion: pkg.version || "Unknown",
        url: `https://anaconda.org/${pkg.owner}/${pkg.name}`,
        owner: pkg.owner || "Unknown",
      }))
      .slice(0, 10);

    return results;
  } catch (error) {
    console.error("Error fetching data from Anaconda.org:", error);
    return [];
  }
}
