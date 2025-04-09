import React from "react";

import { notFound } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";

import OtherStats from "@/components/Stats/OtherStats";

import PackageStats from "@/components/Stats/PackageStats";

import { fetchPackageScore, fetchNotes } from "@/utils/score_res";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RiskSection from "./RiskSection";
import { Code, HelpCircle, Package, Shield } from "lucide-react";
import Link from "next/link";

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
            <CardTitle className="border-b pb-2">
              <span className="flex text-slate-800">
                <Shield className="mr-1 inline-block size-4" />
                <span className="grow">Risk Profile</span>
                <Link href={`/categories`}>
                  <HelpCircle className="ml-2 size-4 text-slate-500 hover:text-slate-700" />
                </Link>
              </span>
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
            <CardTitle className="border-b pb-2">
              <span className="flex text-slate-800">
                <Package className="mr-1 inline-block size-4" />
                <span className="grow">Package</span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PackageStats score={score} pkg={pkg} ecosystem={ecosystem} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="border-b pb-2">
              <span className="flex text-slate-800">
                <Code className="mr-1 inline-block size-4" />
                <span className="grow">Source</span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OtherStats score={score} source={source} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
