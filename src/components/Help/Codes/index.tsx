import PACKAGE_NAME_MISMATCH from "./PACKAGE_NAME_MISMATCH";
import Generic from "./Generic";
import REPO_NOT_FOUND from "./REPO_NOT_FOUND";
import INSECURE_CONNECTION from "./INSECURE_CONNECTION";
import NO_PROJECT_NAME from "./NO_PROJECT_NAME";
import NO_AUTHORS_THIS_YEAR from "./NO_AUTHORS_THIS_YEAR";
import FEW_MAX_MONTHLY_AUTHORS from "./FEW_MAX_MONTHLY_AUTHORS";
import LICENSE_CHECKOUT_ERROR from "./LICENSE_CHECKOUT_ERROR";
import LICENSE_MODIFIED from "./LICENSE_MODIFIED";
import { HelpProps } from "./HelpProps";
import PACKAGE_SKEW_NOT_UPDATED from "./PACKAGE_SKEW_NOT_UPDATED";
import NO_SOURCE_URL from "./NO_SOURCE_URL";
import PACKAGE_NO_LICENSE from "./PACKAGE_NO_LICENSE";
import LAST_COMMIT_OVER_A_YEAR from "./LAST_COMMIT_OVER_A_YEAR";
import ONE_AUTHOR_THIS_YEAR from "./ONE_AUTHOR_THIS_YEAR";
import PACKAGE_LICENSE_MISMATCH from "./PACKAGE_LICENSE_MISMATCH";
import LAST_COMMIT_OVER_5_YEARS from "./LAST_COMMIT_OVER_5_YEARS";

function getComponent(code: string): React.FC<HelpProps> {
  switch (code) {
    case "FEW_MAX_MONTHLY_AUTHORS":
      return FEW_MAX_MONTHLY_AUTHORS;
    case "NO_AUTHORS_THIS_YEAR":
      return NO_AUTHORS_THIS_YEAR;
    case "NO_PROJECT_NAME":
      return NO_PROJECT_NAME;
    case "INSECURE_CONNECTION":
      return INSECURE_CONNECTION;
    case "REPO_NOT_FOUND":
      return REPO_NOT_FOUND;
    case "PACKAGE_NAME_MISMATCH":
      return PACKAGE_NAME_MISMATCH;
    case "LICENSE_CHECKOUT_ERROR":
      return LICENSE_CHECKOUT_ERROR;
    case "LICENSE_MODIFIED":
      return LICENSE_MODIFIED;
    case "PACKAGE_SKEW_NOT_UPDATED":
      return PACKAGE_SKEW_NOT_UPDATED;
    case "NO_SOURCE_URL":
      return NO_SOURCE_URL;
    case "PACKAGE_NO_LICENSE":
      return PACKAGE_NO_LICENSE;
    case "LAST_COMMIT_OVER_A_YEAR":
      return LAST_COMMIT_OVER_A_YEAR;
    case "ONE_AUTHOR_THIS_YEAR":
      return ONE_AUTHOR_THIS_YEAR;
    case "PACKAGE_LICENSE_MISMATCH":
      return PACKAGE_LICENSE_MISMATCH;
    case "LAST_COMMIT_OVER_5_YEARS":
      return LAST_COMMIT_OVER_5_YEARS;
    default:
      return Generic;
  }
}

export default function HelpContent({
  note,
  ecosystem,
  packageName,
  pkg,
  source,
}: HelpProps) {
  const Component = getComponent(note.code);
  return (
    <Component
      note={note}
      ecosystem={ecosystem}
      packageName={packageName}
      source={source}
      pkg={pkg}
    />
  );
}
