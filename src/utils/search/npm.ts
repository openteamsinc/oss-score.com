import { PackageResult } from "./PackageResult";

type NpmApiResponse = {
  objects: { package: { name: string; version: string } }[];
};

export default async function searchNpmPackages(
  query: string,
  limit: number = 10,
): Promise<Promise<PackageResult[]>> {
  const searchUrl = `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=${limit}`;

  const response = await fetch(searchUrl);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

  const data: NpmApiResponse = await response.json();
  return data.objects.map(({ package: { name } }) => ({
    ecosystem: "npm",
    name,
  }));
}
