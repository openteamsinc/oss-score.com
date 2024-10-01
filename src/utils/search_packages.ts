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
      ecosystem,
      name,
      source_url,
      damerau_levenshtein(lower(name), lower(?::VARCHAR))::int AS name_distance
    FROM packages
    ORDER BY name_distance
    LIMIT 10  -- Only keep the top 10 matches based on fuzzy distance
  )
  SELECT
    filtered_packages.ecosystem,
    filtered_packages.name,
    scores.health_risk.value AS health_risk,
    scores.maturity.value AS maturity
  FROM filtered_packages
  LEFT JOIN scores ON filtered_packages.source_url = scores.source_url;`;

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
