import SorceCodeLink from "@/components/SourceCodeLink";
import Link from "next/link";
import HowToFix from "./HowtoFix";
import Header from "./Header";
import { HelpProps } from "./HelpProps";

export default function PACKAGE_NAME_MISMATCH({
  //   ecosystem,
  packageName,
  // score,
  source,
}: HelpProps) {
  const toml = `[project]
name = "${packageName}"
`;

  // <Link
  // href={`/pypi/${score.ecosystem_destination.pypi}`}
  // className="text-blue-600 underline"
  // >
  // {score.ecosystem_destination.pypi}
  // </Link>

  return (
    <div className="text-base font-normal">
      <Header title="PACKAGE_NAME_MISMATCH">
        It is likely that this is not official package distributed by the
        mainainers. please see{" "}
        {source.package_destinations.map(([dest]) => (
          <Link
            key={dest}
            href={`/${dest}`}
            className="text-blue-600 underline"
          >
            {dest}
          </Link>
        ))}
      </Header>
      <HowToFix>
        Update the source code <SorceCodeLink url={source.source_url} /> file{" "}
        <code>pyproject.toml</code> to include
        <pre className="m-1 bg-slate-200 p-1">
          <code>{toml}</code>
        </pre>
      </HowToFix>
    </div>
  );
}
