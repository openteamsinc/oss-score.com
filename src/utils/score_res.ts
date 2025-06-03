"use server";
import { NotesResponse, Package, ScoreResponse } from "./scoreTypes";

const BASE_URL = process.env.SCORE_URL || "https://opensourcescore.dev";

export async function fetchPackageScore(
  ecosystem: string,
  name: string,
): Promise<ScoreResponse> {
  const url = `${BASE_URL}/score/${ecosystem.toLowerCase()}/${name}`;
  const res = await fetch(url);

  const data = await res.json();
  if (!res.ok) {
    return {
      ecosystem,
      package_name: name,
      status: data.error,
      errorMessage: data.detail,
      package: {} as Package,
      source: {
        source_url: "",
        error: "server error",
        licenses: [],
        package_destinations: [],
        recent_authors_count: null,
        max_monthly_authors_count: null,
        first_commit: null,
        latest_commit: null,
      },
      score: {
        notes: [],
        legal: { value: "Unknown", notes: [] },
        health_risk: { value: "Unknown", notes: [] },
        maturity: { value: "Unknown", notes: [] },
        security: { value: "Unknown", notes: [] },
      },
    };
  }

  return data;
}

export async function fetchNotes(): Promise<NotesResponse> {
  const url = `${BASE_URL}/notes/categories`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

type RecentPackage = [string, string];
export async function fetchRecentPackages(): Promise<RecentPackage[]> {
  const url = `${BASE_URL}/recent/packages`;
  const res = await fetch(url);
  if (res.status !== 200) {
    console.error("Error fetching recent packages:", res.status);
    const data = await res.json();
    console.log("response", data);
    throw new Error("Error fetching recent packages");
  }
  const data = await res.json();
  return data.recent_packages;
}
