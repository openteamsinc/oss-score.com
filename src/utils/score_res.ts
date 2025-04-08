import { NotesResponse, Package, ScoreResponse } from "./scoreTypes";

const BASE_URL =
  process.env.SCORE_URL || "https://score-845372508455.us-west1.run.app";

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
      source: null,
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
