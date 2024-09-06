import { fetchOne } from "@/utils/database";
import { Score } from "@/utils/score";
import { mdiAlert, mdiPackage } from "@mdi/js";
import Icon from "@mdi/react";
import { notFound } from "next/navigation";
import GithubStats from "./GitHubStats";

type Props = {
  params: {
    ecosystem: string;
    packageName: string;
  };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Package({
  params: { ecosystem, packageName },
}: Props) {
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
    packageName,
  );
  if (data == null) {
    notFound();
  }
  return (
    <article className="container m-auto">
      <h1>
        {ecosystem}/{packageName}
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <section className="mb-2">
            <h2 className="border-b border-b-slate-300">
              Maturity: <span>{data.maturity.value}</span>
            </h2>
            <ul className="max-w-md list-inside space-y-1 text-slate-500">
              {data.maturity.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </section>
          <section className="mb-2">
            <h2 className="border-b border-b-slate-300">
              Health & Risk: <span>{data.health_risk.value}</span>
            </h2>
            <ul className="max-w-md list-inside space-y-1 text-slate-500">
              {data.health_risk.notes.map((note, index) => (
                <li key={index} className="flex items-center">
                  <Icon
                    path={mdiAlert}
                    size={0.75}
                    className="mx-2 text-yellow-600"
                  />
                  {note}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="border-b border-b-slate-300">Packages</h2>
            <ul className="max-w-md list-inside space-y-1 text-slate-500">
              {data.packages.map((packageData, index) => (
                <li key={index} className="flex items-center">
                  <Icon path={mdiPackage} size={0.75} className="mx-2 " />
                  {packageData.ecosystem}/{packageData.name}@
                  {packageData.version}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div>
          <h2 className="border-b border-b-slate-300">Stats</h2>
          {data.source_url.startsWith("https://github.com") ? (
            <GithubStats score={data} />
          ) : null}
        </div>
      </div>
      <code>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </code>
    </article>
  );
}
