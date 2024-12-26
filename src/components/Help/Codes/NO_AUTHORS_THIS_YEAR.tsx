import { Score } from "@/utils/score_res";
import Header from "./Header";

type Props = {
  ecosystem: string;
  packageName: string;
  score: Score;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NO_AUTHORS_THIS_YEAR({ score }: Props) {
  return (
    <div className="text-base font-normal">
      <Header title="NO_AUTHORS_THIS_YEAR">
        The source code has not been contributed to in a long time
      </Header>
    </div>
  );
}
