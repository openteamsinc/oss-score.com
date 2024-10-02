"use server";

import { fetchAll } from "./database";
import { HealthRiskValue, MaturityValue } from "./score";

export type PackageResult = {
  ecosystem: string;
  name: string;
  health_risk: HealthRiskValue;
  maturity: MaturityValue;
};

export default async function search_packages(
  query: string,
  signal?: AbortSignal,
) {
  const sqlQuery = `
    SELECT DISTINCT
      packages.ecosystem,
      packages.name,
      scores.health_risk.value AS health_risk,
      scores.maturity.value AS maturity,
      damerau_levenshtein(lower(name), lower(?::VARCHAR))::int AS name_distance
    FROM packages
    LEFT JOIN scores ON packages.source_url = scores.source_url
    ORDER BY
      name_distance,
      name
    LIMIT 10;
  `;

  try {
    // Pass the signal only if it's provided
    const options = signal ? { signal } : {};
    const results = await fetchAll<PackageResult>(sqlQuery, query, options);

    return results.map((result) => ({
      ecosystem: result.ecosystem,
      name: result.name,
    }));
  } catch (error) {
    // Type check before accessing error properties
    if (error instanceof Error && error.name === "AbortError") {
      console.log("Request was aborted");
    } else if (error instanceof Error) {
      console.error("Error fetching packages:", error.message);
      throw error; // Re-throw if not an abort error
    } else {
      console.error("Unknown error occurred:", error);
      throw error; // Re-throw if the error is not an instance of Error
    }
  }
}
