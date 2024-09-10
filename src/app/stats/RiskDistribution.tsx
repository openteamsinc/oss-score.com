import React from "react";

import { scoreDistribution } from "./stats";

export default async function RiskDistribution() {
  const distribution = await scoreDistribution();

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Health Risk Distribution</h2>
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
