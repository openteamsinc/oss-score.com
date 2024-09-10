import React from "react";
import { licenseDistribution } from "./stats";

export default async function LicenseDistribution() {
  const distribution = await licenseDistribution();

  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        Top 10 License Distribution
      </h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left">License</th>
            <th className="text-left">Count</th>
          </tr>
        </thead>
        <tbody>
          {distribution.map((item) => (
            <tr key={item.license}>
              <td className="py-2">{item.license}</td>
              <td className="py-2">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
