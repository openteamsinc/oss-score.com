import { Score } from "@/utils/score_res";
import PACKAGE_NAME_MISMATCH from "./PACKAGE_NAME_MISMATCH";
import Generic from "./Generic";
import REPO_NOT_FOUND from "./REPO_NOT_FOUND";
import INSECURE_CONNECTION from "./INSECURE_CONNECTION";
import NO_PROJECT_NAME from "./NO_PROJECT_NAME";
import NO_AUTHORS_THIS_YEAR from "./NO_AUTHORS_THIS_YEAR";
import FEW_MAX_MONTHLY_AUTHORS from "./FEW_MAX_MONTHLY_AUTHORS";
import LICENSE_CHECKOUT_ERROR from "./LICENSE_CHECKOUT_ERROR";

type Props = {
  code: string;
  ecosystem: string;
  packageName: string;
  score: Score;
};

function getComponent(code: string): React.FC<Props> {
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
    default:
      return Generic;
  }
}

export default function HelpContent({
  code,
  ecosystem,
  packageName,
  score,
}: Props) {
  const Component = getComponent(code);
  return (
    <Component
      code={code}
      ecosystem={ecosystem}
      packageName={packageName}
      score={score}
    />
  );
}
