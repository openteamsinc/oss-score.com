import React from "react";
import { licenseDistribution } from "./stats";

export default async function LicenseDistribution() {
  const distribution = await licenseDistribution();

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">
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
