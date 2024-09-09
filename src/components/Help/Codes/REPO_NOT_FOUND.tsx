import SourceCodeLink from "@/components/SourceCodeLink";
import { Score } from "@/utils/score";

type Props = {
  ecosystem: string;
  packageName: string;
  score: Score;
};

export default function REPO_NOT_FOUND({
  //   ecosystem,
  //   packageName,
  score,
}: Props) {
  const toml = `[project.urls]
Repository = "<YOUR VERSION CONTROLL>"
`;
  return (
    <div className="text-base font-normal">
      <h1 className="mb-4 border-b text-lg text-slate-900">REPO_NOT_FOUND</h1>
      <div>
        <h2 className="mb-2 text-base text-slate-900">What could this mean?</h2>
        <p className="p-2 text-sm">
          It is likely that <SourceCodeLink url={score.source_url} /> does not
          point to a valid source code repository
        </p>
        <h2 className="mb-2 text-base text-slate-900">How to Fix</h2>
        <p className="p-2 text-sm">
          Update the package mainfest to include a valid source linke. This
          could mean updating the
          <code>pyproject.toml</code> file to include
          <pre className="m-1 bg-slate-200 p-1">
            <code>{toml}</code>
          </pre>
        </p>
      </div>
    </div>
  );
}
