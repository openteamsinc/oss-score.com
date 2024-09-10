import React from "react";
import { healthRiskNotesCount } from "./stats";

export default async function HealthRiskNotes() {
  const notesCount = await healthRiskNotesCount();

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Top 20 Health Risk Notes</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left">Note ID</th>
            <th className="text-left">Count</th>
          </tr>
        </thead>
        <tbody>
          {notesCount.map((item) => (
            <tr key={item.note}>
              <td className="py-2">{item.code}</td>
              <td className="py-2">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
