import React from "react";
import { healthRiskNotesCount } from "./stats";

export default async function HealthRiskNotes() {
  const notesCount = await healthRiskNotesCount();

  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Top 20 Health Risk Notes</h2>
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
