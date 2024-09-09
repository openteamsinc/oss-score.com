import { Score } from "@/utils/score";
import { mdiGithub } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import TimeStat from "./TimeStat";

type Props = {
  score: Score;
};
export default async function GithubStats({ score }: Props) {
  const url = score.source_url;
  const name = url.replace("https://github.com/", "");
  return (
    <dl className="max-w-md divide-y divide-slate-200 text-slate-900 ">
      <div className="flex flex-row pb-3">
        <dt className="mb-1 grow text-slate-500">Source</dt>
        <dd className="flex items-center text-blue-900 underline">
          <Icon path={mdiGithub} size={0.75} />
          <Link href={url}>{name}</Link>
        </dd>
      </div>
      <TimeStat title="Last Source Update" time={score.last_updated} />
    </dl>
  );
}
