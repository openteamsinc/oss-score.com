import HowToFix from "./HowtoFix";
import Header from "./Header";
import { HelpProps } from "./HelpProps";
import { format } from "date-fns";

export default function LAST_COMMIT_OVER_A_YEAR({ source }: HelpProps) {
  const lastCommitDate = source.latest_commit
    ? format(new Date(source.latest_commit), "PPpp")
    : "unknown date";

  return (
    <div className="text-base font-normal">
      <Header title="LAST_COMMIT_OVER_A_YEAR">
        Your package has not been updated in over a year. The last commit was on{" "}
        {lastCommitDate}.
      </Header>
      <HowToFix>
        <p>Consider updating your project by:</p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Committing recent changes to the repository</li>
          <li>Updating dependencies to latest versions</li>
          <li>Addressing open issues and pull requests</li>
          <li>Publishing a new version after updates</li>
        </ul>
        <p className="mt-2">
          Regular updates improve package trustworthiness and security scores.
        </p>
      </HowToFix>
    </div>
  );
}
