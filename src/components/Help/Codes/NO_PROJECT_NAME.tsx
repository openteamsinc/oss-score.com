import SourceCodeLink from "@/components/SourceCodeLink";
import Header from "./Header";
import HowToFix from "./HowtoFix";
import { HelpProps } from "./HelpProps";

export default function NO_PROJECT_NAME({
  //   ecosystem,
  packageName,
  source,
}: HelpProps) {
  const toml = `[project]
name = "${packageName}"
`;
  return (
    <div className="text-base font-normal">
      <Header title="NO_PROJECT_NAME">
        The source code does not contain a reference to the published package
      </Header>
      <HowToFix>
        Update the source code <SourceCodeLink url={source.source_url} /> file{" "}
        <code>pyproject.toml</code> to include
        <pre className="m-1 bg-slate-200 p-1">
          <code>{toml}</code>
        </pre>
      </HowToFix>
    </div>
  );
}
