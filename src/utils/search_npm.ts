import { toast } from "react-toastify";

export type NpmPackageResult = {
  name: string;
  version: string;
  apiUrl: string;
};

type NpmApiPackage = {
  package: {
    name: string;
    version: string;
  };
};

export default async function searchNpmPackages(
  query: string,
): Promise<NpmPackageResult[]> {
  const searchUrl = `https://registry.npmjs.org/-/v1/search`;

  try {
    const response = await fetch(
      `${searchUrl}?text=${encodeURIComponent(query)}&size=10`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const results: NpmPackageResult[] = data.objects.map(
      (pkg: NpmApiPackage) => ({
        name: pkg.package.name,
        version: pkg.package.version,
        apiUrl: `https://registry.npmjs.org/${pkg.package.name}`,
      }),
    );

    return results;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    toast.error(`Error fetching data from npm registry: ${errorMessage}`);
    console.error("Error fetching data from npm registry:", error);
    return [];
  }
}
