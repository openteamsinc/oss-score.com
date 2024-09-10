import React from "react";

import LicenseDistribution from "./LicenseDistribution";
import RiskDistribution from "./RiskDistribution";
import HealthRiskNotes from "./HealthRiskNotes";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 60;

export default async function StatsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">OpenTeams Statistics</h1>

      <div className="mb-8 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Parquet File Location</h2>
        <p className="text-gray-700">
          {process.env.SCORE_LOCATION || "Not specified"}
        </p>
      </div>

      <RiskDistribution />
      <LicenseDistribution />
      <HealthRiskNotes />
    </div>
  );
}
