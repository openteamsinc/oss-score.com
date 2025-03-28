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

export type HealthRiskScore = {
  value: HealthRiskValue;
  notes: string[];
};
export type MaturityScore = {
  value: MaturityValue;
  notes: string[];
};

export type Package = {
  ecosystem: string;
  name: string;
  version?: string;
  release_date?: Date;
  health_risk?: { value: HealthRiskValue | null; notes: string[] };
};

export type Score = {
  timestamp: Date;
  last_updated?: Date;
  source_url: string;
  maturity: MaturityScore;
  health_risk: HealthRiskScore;
  packages: Package[];
  license: boolean;
  license_kind: boolean;
  license_modified: boolean;
};
