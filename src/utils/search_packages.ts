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
  WITH limited_packages AS (
  SELECT
    packages.ecosystem,
    packages.name,
    damerau_levenshtein(name, lower(?::VARCHAR))::int AS name_distance
  FROM packages
  ORDER BY
    name_distance,
    name
  LIMIT 10
  )
  SELECT
    limited_packages.ecosystem,
    limited_packages.name,
    scores.health_risk.value AS health_risk,
    scores.maturity.value AS maturity
  FROM limited_packages
  LEFT JOIN scores ON limited_packages.name = scores.source_url;`;

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
