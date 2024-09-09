import React from "react";
import { cachedNotes, fetchOne } from "@/utils/database";
import { Score } from "@/utils/score";
import { mdiAlert, mdiCircleSmall, mdiHelpCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { notFound } from "next/navigation";

import GithubStats from "@/components/GitHubStats";
import Risk from "@/components/Risk";
import Maturity from "@/components/Maturity";
import OtherStats from "@/components/OtherStats";

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
  const notes = await cachedNotes();
  console.log("notes", notes);
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
  const thisPackage = data.packages.find((p) => {
    return (
      p.ecosystem.toLowerCase() == ecosystem.toLowerCase() &&
      p.name.toLowerCase() == packageName.toLowerCase()
    );
  });
  if (thisPackage?.health_risk.value != null) {
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

  return (
    <article className="container m-auto">
      <h1 className="my-10 text-2xl font-bold">
        {ecosystem}/{packageName}
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <section className="mb-2">
            <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
              Health & Risk: <Risk value={data.health_risk.value} />
            </h2>
            <ul className="w-full list-inside space-y-2 text-sm text-slate-500">
              {data.health_risk.notes.map((noteId, index) => (
                <li key={index} className="mb-2 flex items-start">
                  <span className="h-5 px-2">
                    <Icon
                      path={mdiAlert}
                      size={0.5}
                      className="text-yellow-600"
                    />
                  </span>
                  {notes[noteId].note}
                  <button>
                    <Icon
                      path={mdiHelpCircleOutline}
                      className="cursor-pointer text-slate-300 hover:text-slate-500"
                      size={0.75}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-2">
            <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
              Maturity: <Maturity value={data.maturity.value} />
            </h2>
            <ul className="w-full list-inside space-y-2 text-sm text-slate-500">
              {data.maturity.notes.map((noteId, index) => (
                <li key={index} className="mb-2 flex items-start">
                  <span className="h-5 px-2">
                    <Icon path={mdiCircleSmall} size={0.5} />
                  </span>

                  {notes[noteId].note}
                </li>
              ))}
            </ul>
          </section>

          {/* <section>
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
          </section> */}
        </div>
        <div>
          <h2 className="border-b border-b-slate-300">Stats</h2>
          {data.source_url.startsWith("https://github.com") ? (
            <GithubStats score={data} />
          ) : (
            <OtherStats score={data} />
          )}
        </div>
      </div>
      {/* <code>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </code> */}
    </article>
  );
}
