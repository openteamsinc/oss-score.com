import React from "react";

import { notFound } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";

import OtherStats from "@/components/Stats/OtherStats";

import PackageStats from "@/components/Stats/PackageStats";

import { fetchPackageScore, fetchNotes } from "@/utils/score_res";

import InfoTooltip from "@/components/InfoTooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RiskSection from "./RiskSection";

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
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="text-slate-800">Risk Profile</span>
              <InfoTooltip className="ml-auto" anchor="#legal" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2 text-slate-600">
              <RiskSection
                title="Maturity"
                ecosystem={ecosystem}
                name={name}
                notes={notes}
                categorizedScore={score.maturity}
                source={source}
              />
              <RiskSection
                title="Health"
                ecosystem={ecosystem}
                name={name}
                notes={notes}
                categorizedScore={score.health_risk}
                source={source}
              />
              <RiskSection
                title="Legal"
                ecosystem={ecosystem}
                name={name}
                notes={notes}
                categorizedScore={score.legal}
                source={source}
              />
              <RiskSection
                title="Security"
                ecosystem={ecosystem}
                name={name}
                notes={notes}
                categorizedScore={score.security}
                source={source}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>Package</CardTitle>
          </CardHeader>
          <CardContent>
            <PackageStats score={score} pkg={pkg} ecosystem={ecosystem} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Source</CardTitle>
          </CardHeader>
          <CardContent>
            <OtherStats score={score} source={source} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
