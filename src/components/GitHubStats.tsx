import { Score } from "@/utils/score";
import { mdiGithub } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

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
      <div className="flex flex-row pb-3">
        <dt className="mb-1 grow text-slate-500">Last Source Update</dt>
        <dd className="flex items-center">
          {formatDistanceToNow(score.last_updated, { addSuffix: true })}
        </dd>
      </div>
    </dl>
  );
}
