import SorceCodeLink from "@/components/SourceCodeLink";
import { Score } from "@/utils/score_res";
import Link from "next/link";
import HowToFix from "./HowtoFix";
import Header from "./Header";

type Props = {
  ecosystem: string;
  packageName: string;
  score: Score;
};

export default function PACKAGE_NAME_MISMATCH({
  //   ecosystem,
  packageName,
  score,
}: Props) {
  const toml = `[project]
name = "${packageName}"
`;
  return (
    <div className="text-base font-normal">
      <Header title="PACKAGE_NAME_MISMATCH">
        It is likely that this is not official package distributed by the
        mainainers. please see{" "}
        <Link
          href={`/pypi/${score.ecosystem_destination.pypi}`}
          className="text-blue-600 underline"
        >
          {score.ecosystem_destination.pypi}
        </Link>
      </Header>
      <HowToFix>
        Update the source code <SorceCodeLink url={score.source_url} /> file{" "}
        <code>pyproject.toml</code> to include
        <pre className="m-1 bg-slate-200 p-1">
          <code>{toml}</code>
        </pre>
      </HowToFix>
    </div>
  );
}
