export type ScoreV = { value: string; notes: string[] };
export type Package = {
  ecosystem: string;
  name: string;
  version: string;
};
export type Score = {
  source_url: string;
  maturity: ScoreV;
  health_risk: ScoreV;
  packages: Package[];
};
