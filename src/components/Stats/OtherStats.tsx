import { Score } from "@/utils/score_res";
import TimeStat from "../TimeStat";
import SourceCodeLink from "../SourceCodeLink";
import DiffDialog from "./DiffDialog";
import Link from "next/link";

type Props = {
  score: Score;
  source: {
    license?: { diff?: string; modified: boolean };
    package_destinations: [string, string][];
  };
};
export default async function OtherStats({ score, source }: Props) {
  return (
    <dl className="max-w-md divide-y divide-slate-200 text-slate-900 ">
      <div className="flex flex-row pb-3">
        <dt className="mb-1 grow text-slate-500">Source</dt>
        <dd className="flex items-center text-blue-900 underline">
          <SourceCodeLink url={score.source_url} />
        </dd>
      </div>
      <TimeStat title="Last Source Update" time={score.last_updated} />
      <div className="flex flex-row pb-3">
        <dt className="mb-1 grow text-slate-500">License</dt>
        <dd className="flex items-center ">
          {score.license}
          <DiffDialog
            modified={score.license_modified}
            diff={source.license?.diff}
          />
        </dd>
      </div>
      <div className="flex flex-row pb-3">
        <dt className="mb-1 grow text-slate-500">Distribution Destinations</dt>
        <dd className="text-right">
          {source.package_destinations.map(([dest]) => (
            <div key={dest} className="">
              <Link href={`/${dest}`} className="text-blue-900 underline">
                {dest}
              </Link>
            </div>
          ))}
        </dd>
      </div>
    </dl>
  );
}
