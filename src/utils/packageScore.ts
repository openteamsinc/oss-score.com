import { fetchOne } from "./database";
import { Package, Score } from "./score";

type Result = {
  source: Score | null;
  pkg: Package | null;
};

export default async function packageScore(
  ecosystem: string,
  name: string,
): Promise<Result> {
  const data = await fetchOne<Score>(
    `
      select * from scores
      where source_url = (
        select source_url
        from packages
        where true
        and lower(ecosystem) = lower(?::VARCHAR)
        and lower(name) = lower(?::VARCHAR)
      )
  `,
    ecosystem,
    name,
  );
  if (data == null) {
    return { pkg: null, source: null };
  }
  const thisPackage = data.packages.find((p) => {
    return (
      p.ecosystem.toLowerCase() == ecosystem.toLowerCase() &&
      p.name.toLowerCase() == name.toLowerCase()
    );
  });
  if (thisPackage?.health_risk?.value != null) {
    data.health_risk.value = thisPackage.health_risk.value;
  }
  if (
    thisPackage?.health_risk != null &&
    thisPackage?.health_risk.notes.length > 0
  ) {
    data.health_risk.notes = data.health_risk.notes.concat(
      thisPackage.health_risk.notes,
    );
  }

  return { pkg: thisPackage || null, source: data };
}
