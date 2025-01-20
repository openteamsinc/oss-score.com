import axios from "axios";

export type PyPIPackageResult = {
  name: string;
  version: string;
  latest_release_number: string;
  package_manager_url: string;
};

type PyPiApiProject = {
  name: string;
  latest_release_number?: string; // Optional because it might be undefined
};

export default async function searchPyPIPackages(
  query: string,
): Promise<PyPIPackageResult[]> {
  const apiUrl = `https://libraries.io/api/search`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: query,
        platforms: "pypi",
        api_key: process.env.LIBRARIES_IO_API_KEY,
      },
    });

    const results: PyPIPackageResult[] = response.data
      .slice(0, 10)
      .map((project: PyPiApiProject) => ({
        name: project.name,
        version: project.latest_release_number || "Unknown",
        latest_release_number: project.latest_release_number || "Unknown",
        package_manager_url: `https://pypi.org/project/${project.name}/`,
      }));

    return results;
  } catch (error) {
    console.error("Error fetching data from Libraries.io:", error);
    return [];
  }
}
