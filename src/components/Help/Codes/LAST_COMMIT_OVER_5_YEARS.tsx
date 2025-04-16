import Header from "./Header";
import { HelpProps } from "./HelpProps";
import { format } from "date-fns";

export default function LAST_COMMIT_OVER_5_YEARS({ source }: HelpProps) {
  const lastCommitDate = source.latest_commit
    ? format(new Date(source.latest_commit), "PP")
    : "unknown date";

  return (
    <div className="text-base font-normal">
      <Header title="LAST_COMMIT_OVER_5_YEARS">
        Your package has not been updated in over 5 years. The last commit was
        on {lastCommitDate}.
      </Header>
    </div>
  );
}
