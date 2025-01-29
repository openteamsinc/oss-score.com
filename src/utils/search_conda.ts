import { toast } from "react-toastify";

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
    const response = await fetch(
      `${searchUrl}?name=${encodeURIComponent(query)}&channel=conda-forge`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const results: CondaPackageResult[] = data
      .map((pkg: CondaApiPackage) => ({
        name: pkg.full_name,
        latestVersion: pkg.version || "Unknown",
        url: `https://anaconda.org/${pkg.owner}/${pkg.name}`,
        owner: pkg.owner || "Unknown",
      }))
      .slice(0, 10);

    return results;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    toast.error(`Error fetching data from Anaconda.org: ${errorMessage}`);
    console.error("Error fetching data from Anaconda.org:", error);
    return [];
  }
}
