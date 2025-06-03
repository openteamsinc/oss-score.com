import { Score, Source } from "@/utils/scoreTypes";
import TimeStat from "../TimeStat";
import SourceCodeLink from "../SourceCodeLink";
import Link from "next/link";
import LicenseItem from "./LicenseItem";

type Props = {
  score: Score;
  source: Source | null;
};
export default async function OtherStats({ source }: Props) {
  if (source == null) {
    return "No source";
  }
  return (
    <dl className="w-full divide-y divide-slate-200 text-slate-900 ">
      <div className="flex flex-row pb-3">
        <dt className="mb-1 grow text-slate-500">Location</dt>
        <dd className="flex items-center text-blue-900 underline">
          <SourceCodeLink url={source.source_url} />
        </dd>
      </div>
      <TimeStat title="Last Source Update" time={source.latest_commit} />
      <div className="flex flex-row pb-3">
        <dt className="mb-1 grow text-slate-500">Licenses</dt>
        <dd className="flex flex-col items-end space-y-1">
          {source.licenses?.map((license, index) => (
            <LicenseItem key={index} license={license} />
          )) || "No licenses found"}
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
