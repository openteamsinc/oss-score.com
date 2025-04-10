import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingRecentPackages() {
  return (
    <div className="mt-12 grid grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="block">
          <div className="flex items-center rounded-lg border border-gray-200 bg-white">
            <div className="mr-3 flex size-12 shrink-0 items-center justify-center rounded-md bg-gray-50">
              <Skeleton className="size-6" />
            </div>
            <div className="w-2/3">
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
