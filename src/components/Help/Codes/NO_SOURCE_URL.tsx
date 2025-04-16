import HowToFix from "./HowtoFix";
import Header from "./Header";
import { HelpProps } from "./HelpProps";

export default function NO_SOURCE_URL({ ecosystem, packageName }: HelpProps) {
  const npmInstructions = (
    <>
      <p>Add repository information to your package.json file:</p>
      <pre className="m-1 bg-slate-200 p-1">
        <code>{`"repository": {
  "type": "git",
  "url": "https://github.com/username/repo.git"
}`}</code>
      </pre>
      <p className="mt-2">
        Or for GitHub repositories, a shorthand can be used:
      </p>
      <pre className="m-1 bg-slate-200 p-1">
        <code>{`"repository": "github:username/repo"`}</code>
      </pre>
    </>
  );

  const pypiInstructions = (
    <>
      <p>Add project URLs to your pyproject.toml file:</p>
      <pre className="m-1 bg-slate-200 p-1">
        <code>{`[project.urls]
"Homepage" = "https://github.com/username/repo"
`}</code>
      </pre>
    </>
  );

  return (
    <div className="text-base font-normal">
      <Header title="NO_SOURCE_URL">
        The source code location for {packageName} could not be found. This
        makes it difficult to verify the origin and trustworthiness of this
        package.
      </Header>
      <HowToFix>
        {ecosystem === "npm" ? (
          npmInstructions
        ) : ecosystem === "pypi" ? (
          pypiInstructions
        ) : (
          <p>
            Add source code repository information to your package metadata.
          </p>
        )}

        <p className="mt-3">Benefits of including source URL:</p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Increases trust in your package</li>
          <li>Allows users to review code before installing</li>
          <li>Makes it easier to contribute bug fixes and improvements</li>
          <li>Improves security scores in package evaluation tools</li>
        </ul>
      </HowToFix>
    </div>
  );
}
