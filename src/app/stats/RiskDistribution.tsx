import React from "react";

import { scoreDistribution } from "./stats";

export default async function RiskDistribution() {
  const distribution = await scoreDistribution();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Health Risk Distribution</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left">Health Risk</th>
            <th className="text-left">Count</th>
          </tr>
        </thead>
        <tbody>
          {distribution.map((item) => (
            <tr key={item.value}>
              <td>{item.value}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
