import React from "react";

import LicenseDistribution from "./LicenseDistribution";
import RiskDistribution from "./RiskDistribution";
import HealthRiskNotes from "./HealthRiskNotes";

export default async function StatsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">OpenTeams Statistics</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Parquet File Location</h2>
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
