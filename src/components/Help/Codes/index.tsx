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
    default:
      return Generic;
  }
}

export default function HelpContent({
  note,
  ecosystem,
  packageName,
  score,
  source,
}: HelpProps) {
  const Component = getComponent(note.code);
  return (
    <Component
      note={note}
      ecosystem={ecosystem}
      packageName={packageName}
      score={score}
      source={source}
    />
  );
}
