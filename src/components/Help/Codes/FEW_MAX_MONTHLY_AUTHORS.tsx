import { Score } from "@/utils/score";
import Header from "./Header";

type Props = {
  ecosystem: string;
  packageName: string;
  score: Score;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FEW_MAX_MONTHLY_AUTHORS({ score }: Props) {
  return (
    <div className="text-base font-normal">
      <Header title="FEW_MAX_MONTHLY_AUTHORS">
        The source code has only been contributed to by very few authors. This
        could be a bottleneck for bug fixes and new releases
      </Header>
    </div>
  );
}
