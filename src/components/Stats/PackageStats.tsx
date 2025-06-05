import { Package, Score } from "@/utils/scoreTypes";
import TimeStat from "../TimeStat";
import EcosystemLink from "../EcosystemLink";
import Link from "next/link";

type Props = {
  score: Score;
  ecosystem: string;
  pkg?: Package;
};

export default function PackageStats({ pkg, ecosystem }: Props) {
  if (pkg == null) {
    return null;
  }
  return (
    <dl className="w-full divide-y divide-slate-200 text-slate-900 ">
      <div className="flex flex-row pb-3">
        <dt className="mb-1 grow text-slate-500">{ecosystem}</dt>
        <dd className="flex items-center text-blue-900 ">
          <EcosystemLink pkgName={pkg.name} ecosystem={ecosystem} />
        </dd>
      </div>
      <div className="flex flex-row pb-3">
        <dt className="mb-1 grow text-slate-500">Version</dt>
        <dd className="flex items-center">{pkg.version}</dd>
      </div>
      <TimeStat title="Last Release Date" time={pkg.release_date} />
      <div className="flex flex-row pb-3">
        <dt className="mb-1 grow text-slate-500">License</dt>
        <dd className="flex max-w-[150px]">
          <p className="truncate">
            {pkg.license ? pkg.license : "Not specified"}
          </p>
        </dd>
      </div>
      <div className="flex flex-row pb-3">
        <dt className="mb-1 grow text-slate-500">Dependencies</dt>
        <dd className="flex max-w-[300px] flex-col gap-1">
          {pkg.dependencies.length > 0 ? (
            pkg.dependencies.map((dep, index) => (
              <div key={index} className="flex flex-row items-center gap-2">
                <Link
                  href={`/${ecosystem}/${dep.name}`}
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                  {dep.name}
                </Link>
                {dep.specifiers.length > 0 && (
                  <span className="text-xs text-slate-400">
                    {dep.specifiers.join(", ")}
                  </span>
                )}
              </div>
            ))
          ) : (
            <span className="text-sm text-slate-400">No dependencies</span>
          )}
        </dd>
      </div>
    </dl>
  );
}
