import { Package, Score } from "@/utils/score_res";
import TimeStat from "../TimeStat";
import Link from "next/link";
import { mdiLanguagePython } from "@mdi/js";
import Icon from "@mdi/react";

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
    <dl className="max-w-md divide-y divide-slate-200 text-slate-900 ">
      <div className="flex flex-row pb-3">
        <dt className="mb-1 grow text-slate-500">{ecosystem}</dt>
        <dd className="flex items-center text-blue-900 ">
          <Link
            className="inline items-center underline"
            href={`https://pypi.org/project/${pkg.name}`}
          >
            <Icon className="inline" path={mdiLanguagePython} size={0.75} />
            {pkg.name}
          </Link>
        </dd>
      </div>
      <div className="flex flex-row pb-3">
        <dt className="mb-1 grow text-slate-500">Version</dt>
        <dd className="flex items-center">{pkg.version}</dd>
      </div>
      <TimeStat title="Last Release Date" time={pkg.release_date} />
    </dl>
  );
}
