import axios from "axios";

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
    const response = await axios.get(searchUrl, {
      params: {
        text: query,
        size: 10, // Limit results to the top 10
      },
    });

    const results: NpmPackageResult[] = response.data.objects.map(
      (pkg: NpmApiPackage) => ({
        name: pkg.package.name,
        version: pkg.package.version,
        apiUrl: `https://registry.npmjs.org/${pkg.package.name}`, // Link to the npm package in the API
      }),
    );

    return results;
  } catch (error) {
    console.error("Error fetching data from npm registry:", error);
    return [];
  }
}
