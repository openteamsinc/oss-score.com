type License = {
  license: string;
  kind: string;
  similarity: number;
  best_match: string;
  modified: boolean;
  diff?: string;
};

export type Package = {
  name: string;
  version: string;
  source_url: string;
  release_date: string;
  status: null;
  license: string | null;
};

export type Source = {
  source_url: string;
  recent_authors_count: number;
  max_monthly_authors_count: number;
  first_commit: string;
  latest_commit: string;
  license: License;
  package_destinations: [string, string][];
};

export const UNKNOWN = "Unknown";
export const PLACEHOLDER = "Placeholder";

// ---

export const MATURE = "Mature";
export const LEGACY = "Legacy";
export const EXPERIMENTAL = "Experimental";

export type MaturityValue =
  | typeof MATURE
  | typeof LEGACY
  | typeof EXPERIMENTAL
  | typeof UNKNOWN
  | typeof PLACEHOLDER;

export const HEALTHY = "Healthy";
export const CAUTION_NEEDED = "Caution Needed";
export const MODERATE_RISK = "Moderate Risk";
export const HIGH_RISK = "High Risk";

export type HealthRiskValue =
  | typeof HEALTHY
  | typeof CAUTION_NEEDED
  | typeof MODERATE_RISK
  | typeof HIGH_RISK
  | typeof UNKNOWN
  | typeof PLACEHOLDER;

export type Score = {
  source_url: string;
  maturity: {
    value: MaturityValue;
    notes: string[];
  };
  health_risk: {
    value: HealthRiskValue;
    notes: string[];
  };
  legal: {
    value: HealthRiskValue;
    notes: string[];
  };
  last_updated: string;
  license: string;
  license_kind: string;
  license_modified: boolean;
};

export type PackageScore =
  | {
      ecosystem: string;
      package_name: string;
      status: "not_found";
      errorMessage: undefined;
      package: Package;
      source: null;
      score: null;
    }
  | {
      ecosystem: string;
      package_name: string;
      status: "ok";
      errorMessage: undefined;
      package: Package;
      source: Source;
      score: Score;
    }
  | {
      ecosystem: string;
      package_name: string;
      status: string;
      errorMessage?: string;
      package: Package;
      source: null;
      score: null;
    };

const BASE_URL =
  process.env.SCORE_URL || "https://score-845372508455.us-west1.run.app";

export async function fetchPackageScore(
  ecosystem: string,
  name: string,
): Promise<PackageScore> {
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
      score: null,
    };
  }

  return data;
}

export type Notes = {
  [key: string]: {
    code: string;
    id: number;
    category: string;
    description: string;
  };
};

export type NoteResponse = {
  categories: string[];
  groups: { [group: string]: string[] };
  notes: Notes;
};

export async function fetchNotes(): Promise<NoteResponse> {
  const url = `${BASE_URL}/notes/categories`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
