import { Score } from "@/utils/score_res";
import Header from "./Header";
import HowToFix from "./HowtoFix";

type Props = {
  ecosystem: string;
  packageName: string;
  score: Score;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function LICENSE_CHECKOUT_ERROR({ score }: Props) {
  return (
    <div className="text-base font-normal">
      <Header title="LICENSE_CHECKOUT_ERROR">
        The source code license could not be determined
      </Header>
      <HowToFix>
        Add a <code>LICENSE.txt</code> to the source code
      </HowToFix>
    </div>
  );
}
