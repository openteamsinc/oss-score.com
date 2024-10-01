"use server";

import { fetchAll } from "./database";
import { HealthRiskValue, MaturityValue } from "./score";

export type PackageResult = {
  ecosystem: string;
  name: string;
  health_risk: HealthRiskValue;
  maturity: MaturityValue;
};

export async function searchByPrefix(query: string) {
  const sqlQuery = `
  SELECT DISTINCT
    packages.ecosystem,
    packages.name,
    scores.health_risk.value AS health_risk,
    scores.maturity.value AS maturity
  FROM packages
  LEFT JOIN scores ON packages.source_url = scores.source_url
  WHERE lower(packages.name) ILIKE lower(?::VARCHAR) || '%'  -- Prefix matching
  ORDER BY
    packages.name
  LIMIT 100`;

  try {
    const results = await fetchAll<PackageResult>(sqlQuery, query);
    console.log("Prefix matching results", results);
    return results; // Return the filtered results
  } catch (error) {
    console.error("Error querying packages by prefix:", error);
    return [];
  }
}

export async function refineWithDamerauLevenshtein(
  filteredResults: PackageResult[],
  query: string,
) {
  if (filteredResults.length === 0) {
    return []; // No need to run Damerau-Levenshtein if no prefix matches
  }

  const sqlQuery = `
  SELECT DISTINCT
    ecosystem,
    name,
    health_risk,
    maturity,
    damerau_levenshtein(lower(name), lower(?::VARCHAR))::int AS name_distance
  FROM (
    SELECT * FROM packages WHERE name IN (${filteredResults.map((pkg) => `'${pkg.name}'`).join(", ")})  -- Filter by prefix results
  ) AS filtered_packages
  ORDER BY
    name_distance,
    name
  LIMIT 10`;

  try {
    const results = await fetchAll<PackageResult>(sqlQuery, query);
    console.log("Damerau-Levenshtein results", results);
    return results; // Return refined results
  } catch (error) {
    console.error("Error querying packages with Damerau-Levenshtein:", error);
    return [];
  }
}

export default async function search_packages(query: string) {
  const prefixResults = await searchByPrefix(query);
  const refinedResults = await refineWithDamerauLevenshtein(
    prefixResults,
    query,
  );

  return refinedResults;
}
