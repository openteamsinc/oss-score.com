import React from "react";

import { notFound } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";

import Risk from "@/components/Risk";
import OtherStats from "@/components/Stats/OtherStats";

import PackageStats from "@/components/Stats/PackageStats";

import { fetchPackageScore, fetchNotes } from "@/utils/score_res";
import NoteList from "./NotesList";
import InfoTooltip from "@/components/InfoTooltip";

type Props = {
  params: Promise<{
    ecosystem: string;
    packageName: string[];
  }>;
};
export default async function PackageScoreComponent({ params }: Props) {
  const { ecosystem, packageName } = await params;
  const name = packageName.join("/");

  const [{ notes }, { package: pkg, status, score, source, errorMessage }] =
    await Promise.all([fetchNotes(), fetchPackageScore(ecosystem, name)]);

  if (status === "not_found") {
    notFound();
  }

  if (status !== "ok" || !score) {
    return <ErrorMessage status={status} message={errorMessage} />;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h1 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
          Risk Profile
          <InfoTooltip className="ml-auto" anchor="#legal" />
        </h1>
        <section className="mb-2 pl-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            <span className="grow">Maturity:</span>
            <Risk value={score.maturity.value} />
          </h2>
          <NoteList
            notes={notes}
            ecosystem={ecosystem}
            scoreNotes={score.maturity.notes}
            name={name}
            score={score}
            source={source}
          />
        </section>

        <section className="mb-2 pl-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            <span className="grow">Health:</span>
            <Risk value={score.health_risk.value} />
          </h2>
          <NoteList
            notes={notes}
            ecosystem={ecosystem}
            scoreNotes={score.health_risk.notes}
            name={name}
            score={score}
            source={source}
          />
        </section>
        <section className="mb-2 pl-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            <span className="grow">Legal: </span>
            <Risk value={score.legal.value} />
          </h2>
          <NoteList
            notes={notes}
            ecosystem={ecosystem}
            scoreNotes={score.legal.notes}
            name={name}
            score={score}
            source={source}
          />
        </section>
        <section className="mb-2 pl-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            <span className="grow">Security:</span>
            <Risk value={score.security.value} />
          </h2>
          <NoteList
            notes={notes}
            ecosystem={ecosystem}
            scoreNotes={score.security.notes}
            name={name}
            score={score}
            source={source}
          />
        </section>
      </div>
      <div>
        <h2 className="border-b border-b-slate-300">Package Stats</h2>
        <PackageStats score={score} pkg={pkg} ecosystem={ecosystem} />
        <h2 className="border-b border-b-slate-300">Source Stats</h2>
        <OtherStats score={score} source={source} />
      </div>
    </div>
  );
}
