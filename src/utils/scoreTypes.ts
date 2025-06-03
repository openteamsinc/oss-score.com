export type Package = {
  name: string;
  ecosystem: string;
  version: string | null;
  license: string | null;
  source_url: string | null;
  source_url_key: string | null;
  release_date: string | null;
  status: string;
};

export type License = {
  error: string | null;
  license: string | null;
  kind: string | null;
  best_match: string | null;
  similarity: number | null;
  modified: boolean;
  diff: string | null;
  md5: string | null;
  // --- new fields
  name: string | null;
  restrictions: string[];

  additional_text: string | null;
  spdx_id: string | null;
  is_osi_approved: boolean | null;
  // filename where located in repo
  path: string | null;
};

export type Source = {
  source_url: string;
  error: string | null;
  licenses: License[] | null;
  package_destinations: [string, string][];
  recent_authors_count: number | null;
  max_monthly_authors_count: number | null;
  first_commit: string | null;
  latest_commit: string | null;
};

export type CategorizedScore = {
  value: string;
  notes: string[];
};

export type Score = {
  legal: CategorizedScore;
  health_risk: CategorizedScore;
  maturity: CategorizedScore;
  security: CategorizedScore;
  notes: string[];
};

export type ScoreResponse = {
  ecosystem: string;
  package_name: string;
  package: Package;
  source: Source;
  score: Score;
  status: string;
  errorMessage?: string;
};

export type NoteDescr = {
  code: string;
  group: string;
  category: string;
  description: string;
  id: number;
};

export type NotesResponse = {
  notes: { [key: string]: NoteDescr };
  categories: string[];
  groups: { [key: string]: string[] };
};
