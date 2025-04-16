import HowToFix from "./HowtoFix";
import Header from "./Header";
import { HelpProps } from "./HelpProps";

export default function PACKAGE_NO_LICENSE({
  ecosystem,
  packageName,
  source,
}: HelpProps) {
  const npmInstructions = (
    <>
      <p>Add a license field to your package.json file:</p>
      <pre className="m-1 bg-slate-200 p-1">
        <code>{`"license": "MIT"`}</code>
      </pre>
      <p className="mt-2">
        And include a LICENSE file in the root of your repository.
      </p>
    </>
  );

  const pypiInstructions = (
    <>
      <p>Add license information to your pyproject.toml file:</p>
      <pre className="m-1 bg-slate-200 p-1">
        <code>{`[project]
license = { text = "${source.license?.license || "<YOUR LICENSE>"}" }
`}</code>
      </pre>
    </>
  );

  return (
    <div className="text-base font-normal">
      <Header title="PACKAGE_NO_LICENSE">
        The package {packageName} was published without license information in
        its metadata. Even if a license exists in the repository, omitting it
        from the package metadata creates ambiguity about usage rights and may
        discourage potential users who can&apos;t easily determine the legal
        terms for using your code.
      </Header>
      <HowToFix>
        {ecosystem === "npm" ? (
          npmInstructions
        ) : ecosystem === "pypi" ? (
          pypiInstructions
        ) : (
          <p>Add license information to your package metadata</p>
        )}
      </HowToFix>
    </div>
  );
}
