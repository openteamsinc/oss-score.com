interface Package {
  package_type: string;
  package_id: string;
  latest_version: string;
  release_date: string;
}

export interface ProjectData {
  source_url: string;
  homepage_url: string;
  project_name: string;
  source_type: string;
  packages: Package[];
  scores: {
    maturity: {
      value: string;
      notes: Array<string>;
    };
    health_risk: {
      value: string;
      notes: Array<string>;
    };
  };
}
