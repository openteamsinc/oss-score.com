import { formatDistanceToNow } from "date-fns";
import Header from "./Header";
import { HelpProps } from "./HelpProps";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NO_AUTHORS_THIS_YEAR({ source }: HelpProps) {
  return (
    <div className="text-base font-normal">
      <Header title="NO_AUTHORS_THIS_YEAR">
        The source code has not been contributed to for{" "}
        {source.latest_commit == null
          ? "n/a"
          : formatDistanceToNow(source.latest_commit, { addSuffix: true })}
      </Header>
    </div>
  );
}
