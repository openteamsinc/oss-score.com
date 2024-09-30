"use server";

import { fetchAll } from "./database";
import { HealthRiskValue, MaturityValue } from "./score";

export type PackageResult = {
  ecosystem: string;
  name: string;
  health_risk: HealthRiskValue;
  maturity: MaturityValue;
};

export default async function search_packages(query: string) {
  const sqlQuery = `
    SELECT DISTINCT
      packages.ecosystem,
      packages.name,
      damerau_levenshtein(lower(packages.name), lower(?::VARCHAR))::int AS name_distance
    FROM packages
    WHERE lower(packages.name) LIKE lower(?::VARCHAR) || '%'  -- Apply prefix matching to limit results
    ORDER BY name_distance, name
    LIMIT 10`; // Return only top 10 results

  try {
    const results = await fetchAll<PackageResult>(sqlQuery, query);
    console.log("results", results);
    return results.map((result) => ({
      ecosystem: result.ecosystem, // Send only the fields needed for search suggestions
      name: result.name,
    }));
  } catch (error) {
    console.error("Error querying packages:", error);
    return [];
  }
}
