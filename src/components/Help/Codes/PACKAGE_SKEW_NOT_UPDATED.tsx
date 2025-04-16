import SourceCodeLink from "@/components/SourceCodeLink";
import Link from "next/link";
import HowToFix from "./HowtoFix";
import Header from "./Header";
import { HelpProps } from "./HelpProps";
import { format } from "date-fns";

export default function PACKAGE_SKEW_NOT_UPDATED({
  ecosystem,
  pkg,
  source,
}: HelpProps) {
  const latestCommitDate = source.latest_commit
    ? format(new Date(source.latest_commit), "PP")
    : "unknown date";
  const packageDate = pkg.release_date
    ? format(new Date(pkg.release_date), "PP")
    : "unknown date";

  return (
    <div className="text-base font-normal">
      <Header title="PACKAGE_SKEW_NOT_UPDATED">
        This package is significantly outdated. The published version (
        {packageDate}) is at least a year behind the latest source code updates
        ({latestCommitDate}).
      </Header>
      <HowToFix>
        <p>Consider updating this package by:</p>
        <ol className="ml-5 list-decimal space-y-2">
          <li>
            Pull the latest changes from{" "}
            <SourceCodeLink url={source.source_url} />
          </li>
          <li>Update the version number in your package configuration file</li>
          <li>
            Build and publish a new release as{" "}
            <span className="font-semibold">{pkg.name}</span> to the {ecosystem}{" "}
            registry
          </li>
        </ol>

        {source.package_destinations.length > 0 && (
          <p className="mt-3">
            Check if there are more recent versions available in the official
            destinations:
            {source.package_destinations.map(([dest, destName]) => (
              <Link
                key={dest}
                href={`/${dest}`}
                className="ml-2 text-blue-600 underline"
              >
                {destName}
              </Link>
            ))}
          </p>
        )}
      </HowToFix>
    </div>
  );
}
