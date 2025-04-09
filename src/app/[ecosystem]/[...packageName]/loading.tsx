import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import InfoTooltip from "@/components/InfoTooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PackageScoreLoading() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="text-slate-800">Risk Profile</span>
              <InfoTooltip className="ml-auto" anchor="#legal" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2 text-slate-600">
              <div className="space-y-2 p-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>Package</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 p-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 p-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
