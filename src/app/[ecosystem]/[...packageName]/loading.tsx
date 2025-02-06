import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingScore() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <section className="mb-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            Health & Risk:
          </h2>
          <ul className="w-full list-inside space-y-2 p-4">
            <li>
              <Skeleton className="h-4 w-3/4" />
            </li>
            <li>
              <Skeleton className="h-4 w-2/3" />
            </li>
            <li>
              <Skeleton className="h-4 w-4/5" />
            </li>
          </ul>
        </section>
        <section className="mb-2">
          <h2 className="m-2 flex items-center border-b border-b-slate-300 text-lg">
            Maturity:
          </h2>
          <ul className="w-full list-inside space-y-2 p-4">
            <li>
              <Skeleton className="h-4 w-4/5" />
            </li>
            <li>
              <Skeleton className="h-4 w-3/4" />
            </li>
            <li>
              <Skeleton className="h-4 w-2/3" />
            </li>
          </ul>
        </section>
      </div>
      <div>
        <h2 className="border-b border-b-slate-300">Package Stats</h2>
        <div className="space-y-2 p-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <h2 className="border-b border-b-slate-300">Source Stats</h2>
        <div className="space-y-2 p-4">
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
