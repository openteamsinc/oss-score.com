"use server";
import { cachedNotes, fetchAll } from "@/utils/database";

type ScoreDistribution = {
  value: string;
  count: number;
};

export async function scoreDistribution() {
  return fetchAll<ScoreDistribution>(`
    SELECT 
    health_risk.value as value,
    COUNT(*) AS count,
    FROM scores
    GROUP BY health_risk.value
`);
}

type LicenseDistribution = {
  license: string;
  count: number;
};

export async function licenseDistribution() {
  return fetchAll<LicenseDistribution>(`
      SELECT 
        COALESCE(license, 'Unknown') as license,
        COUNT(*) AS count
      FROM scores
      GROUP BY license
      ORDER BY count DESC
      LIMIT 10
    `);
}

type HealthRiskNoteRow = {
  note: number;
  count: number;
};
type HealthRiskNote = {
  note: number;
  code: string;
  count: number;
};

export async function healthRiskNotesCount(): Promise<HealthRiskNote[]> {
  // return [];
  const notes = await cachedNotes();
  const rows = await fetchAll<HealthRiskNoteRow>(`
    WITH packages as (
      SELECT UNNEST(packages) as p
      FROM scores
    ),
    flattened_notes AS (
      SELECT unnest(health_risk.notes) AS note
      FROM scores
      UNION ALL
      SELECT unnest(packages.p.health_risk.notes) AS note
      FROM packages
    )
    SELECT
      note,
      COUNT(*) AS count
    FROM flattened_notes
    WHERE note IS NOT NULL
    GROUP BY note
    ORDER BY count DESC
   `);

  const data = rows.map((row) => ({ ...row, code: notes[row.note].code }));
  return data;
}
