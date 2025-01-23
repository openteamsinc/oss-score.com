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
    const data = await fetch(
      `${searchUrl}?text=${encodeURIComponent(query)}&size=10`,
      {
        method: "GET",
      },
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });

    const results: NpmPackageResult[] = data.objects.map(
      (pkg: NpmApiPackage) => ({
        name: pkg.package.name,
        version: pkg.package.version,
        apiUrl: `https://registry.npmjs.org/${pkg.package.name}`,
      }),
    );

    return results;
  } catch (error) {
    console.error("Error fetching data from npm registry:", error);
    return [];
  }
}
