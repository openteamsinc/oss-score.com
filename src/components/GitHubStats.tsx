import { Score } from "@/utils/score";
import TimeStat from "./TimeStat";
import SourceCodeLink from "./SourceCodeLink";

type Props = {
  score: Score;
};
export default async function GithubStats({ score }: Props) {
  const url = score.source_url;
  return (
    <dl className="w-full divide-y divide-slate-200 text-slate-900 ">
      <div className="flex flex-row pb-3">
        <dt className="mb-1 grow text-slate-500">Source</dt>
        <dd className="flex items-center text-blue-900 underline">
          <SourceCodeLink url={url} />
        </dd>
      </div>
      <TimeStat title="Last Source Update" time={score.last_updated} />
    </dl>
  );
}
