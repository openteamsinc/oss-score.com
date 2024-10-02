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
  WITH filtered_packages AS (
    SELECT
      packages.ecosystem,
      packages.name,
      scores.health_risk AS health_risk,  -- Correctly reference health_risk and maturity
      scores.maturity AS maturity,
      packages.source_url
    FROM packages
    LEFT JOIN scores ON packages.source_url = scores.source_url
    WHERE lower(packages.name) ILIKE lower(?::VARCHAR) || '%'  -- Prefix matching
    LIMIT 100  -- Limit rows for Damerau-Levenshtein
  )
  SELECT DISTINCT
    filtered_packages.ecosystem,
    filtered_packages.name,
    filtered_packages.health_risk,
    filtered_packages.maturity,
    damerau_levenshtein(lower(filtered_packages.name), lower(?::VARCHAR))::int AS name_distance
  FROM filtered_packages
  ORDER BY
    name_distance,
    filtered_packages.name
  LIMIT 10`;

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
