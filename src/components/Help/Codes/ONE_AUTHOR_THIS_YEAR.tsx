import HowToFix from "./HowtoFix";
import Header from "./Header";
import { HelpProps } from "./HelpProps";

export default function ONE_AUTHOR_THIS_YEAR({ source }: HelpProps) {
  const authorCount = source.recent_authors_count ?? 0;

  return (
    <div className="text-base font-normal">
      <Header title="ONE_AUTHOR_THIS_YEAR">
        Your package has {authorCount === 0 ? "no" : "only one"} active
        contributor in the last year.
      </Header>
      <HowToFix>
        <p>Having few contributors increases security and maintenance risks:</p>
        <ul className="ml-5 list-disc space-y-1">
          <li>No code review from other contributors</li>
          <li>Single point of failure for maintenance</li>
          <li>Higher risk of project abandonment</li>
        </ul>

        <p className="mt-3">
          Consider these steps to increase contributor participation:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Add clear contribution guidelines</li>
          <li>Respond promptly to pull requests and issues</li>
          <li>Add good documentation and examples</li>
          <li>Promote your project in relevant communities</li>
        </ul>
      </HowToFix>
    </div>
  );
}
