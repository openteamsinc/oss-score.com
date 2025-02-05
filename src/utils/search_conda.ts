import { toast } from "react-toastify";

export type CondaApiPackage = {
  full_name: string;
  latestVersion: string;
  url: string;
  owner: string;
};

async function fetchCondaPackages(query: string): Promise<CondaApiPackage[]> {
  const searchUrl = `https://api.anaconda.org/search?name=${encodeURIComponent(query)}&channel=conda-forge`;

  try {
    const response = await fetch(searchUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    toast.error(
      `Error fetching data from Anaconda.org: ${
        error instanceof Error ? error.message : "An unknown error occurred."
      }`,
    );
    return [];
  }
}

export default async function searchCondaForgePackages(
  query: string,
): Promise<CondaApiPackage[]> {
  return await fetchCondaPackages(query);
}
