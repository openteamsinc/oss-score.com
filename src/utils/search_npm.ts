import { toast } from "react-toastify";

export type NpmPackageResult = {
  name: string;
  version: string;
  apiUrl: string;
};

type NpmApiResponse = {
  objects: Array<{ package: { name: string; version: string } }>;
};

export default async function searchNpmPackages(
  query: string,
): Promise<NpmPackageResult[]> {
  const searchUrl = `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=10`;

  try {
    const response = await fetch(searchUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: NpmApiResponse = await response.json();

    return data.objects.map(({ package: pkg }) => ({
      name: pkg.name,
      version: pkg.version,
      apiUrl: `https://registry.npmjs.org/${pkg.name}`,
    }));
  } catch (error) {
    toast.error(
      `Error fetching data from npm registry: ${
        error instanceof Error ? error.message : "An unknown error occurred."
      }`,
    );
    return [];
  }
}
