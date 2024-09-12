import React from "react";
import { cachedNotes } from "@/utils/database";

import { mdiAlert, mdiCircleSmall } from "@mdi/js";
import Icon from "@mdi/react";
import { notFound } from "next/navigation";

import Risk from "@/components/Risk";
import Maturity from "@/components/Maturity";
import OtherStats from "@/components/OtherStats";
import RiskHelp from "@/components/Help/Risk";
import PackageStats from "@/components/Stats/PackageStats";
import packageScore from "@/utils/packageScore";

type Props = {
  ecosystem: string;
  name: string;
};

export default async function PackageScore({ ecosystem, name }: Props) {
  const notes = await cachedNotes();
  const { source, pkg } = await packageScore(ecosystem, name);
  if (pkg == null || source == null) {
    notFound();
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <section className="mb-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            Health & Risk: <Risk value={source.health_risk.value} />
          </h2>
          <ul className="w-full list-inside space-y-2 text-sm text-slate-500">
            {source.health_risk.notes
              .filter((n) => n != null)
              .map((noteId, index) => (
                <li key={index} className="mb-2 flex items-start">
                  <span className="h-5 px-2">
                    <Icon
                      path={mdiAlert}
                      size={0.5}
                      className="text-yellow-600"
                    />
                  </span>
                  {notes[noteId]?.note || `Unknown id ${noteId}`}
                  <RiskHelp
                    note={notes[noteId]}
                    ecosystem={ecosystem}
                    packageName={name}
                    score={source}
                  />
                </li>
              ))}
          </ul>
        </section>
        <section className="mb-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            Maturity: <Maturity value={source.maturity.value} />
          </h2>
          <ul className="w-full list-inside space-y-2 text-sm text-slate-500">
            {source.maturity.notes.map((noteId, index) => (
              <li key={index} className="mb-2 flex items-start">
                <span className="h-5 px-2">
                  <Icon path={mdiCircleSmall} size={0.5} />
                </span>

                {notes[noteId]?.note || `Unknown id ${noteId}`}
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
        <h2 className="border-b border-b-slate-300">Package Stats</h2>
        <PackageStats score={source} pkg={pkg} />
        <h2 className="border-b border-b-slate-300">Source Stats</h2>
        <OtherStats score={source} />
      </div>
    </div>
  );
  //   {/* <code>
  //     <pre>{JSON.stringify(data, null, 2)}</pre>
  //   </code> */}
}
