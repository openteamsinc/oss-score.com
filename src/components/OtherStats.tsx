import { Score } from "@/utils/score";
import TimeStat from "./TimeStat";
import SourceCodeLink from "./SourceCodeLink";

type Props = {
  score: Score;
};
export default async function OtherStats({ score }: Props) {
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
          {score.license} {score.license_modified ? `(modified)` : ""}
        </dd>
      </div>
    </dl>
  );
}
