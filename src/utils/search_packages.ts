"use server";

import { fetchAll } from "./database";
import { HealthRiskValue, MaturityValue } from "./score";

export type PackageResult = {
  ecosystem: string;
  name: string;
  health_risk: HealthRiskValue;
  maturity: MaturityValue;
};

export default async function search_packages(query: string) {
  const sqlQuery = `
select distinct
    packages.ecosystem,
    packages.name,
    scores.health_risk.value as health_risk,
    scores.maturity.value as maturity,
from packages
left join scores on packages.source_url = scores.source_url
where true
and (
  lower(name) like lower(?::VARCHAR || '%')
  or lower(name) like lower('%' || ?::VARCHAR || '%')
)

order by 
  case 
    when scores.health_risk.value = 'Healthy' then 0
    when lower(name) = lower(?::VARCHAR) then 1
    when lower(name) like lower(?::VARCHAR || '%') then 2
    else 3
  end,
  name
limit 10
`;

  try {
    const results = await fetchAll<PackageResult>(
      sqlQuery,
      query,
      query,
      query,
      query,
    );
    return results;
  } catch (error) {
    console.error("Error querying packages:", error);
    // throw error;
    return [];
  }
}
