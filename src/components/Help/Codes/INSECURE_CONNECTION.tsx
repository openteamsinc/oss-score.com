import SorceCodeLink from "@/components/SourceCodeLink";
import { Score } from "@/utils/score_res";
import HowToFix from "./HowtoFix";
import Header from "./Header";

type Props = {
  ecosystem: string;
  packageName: string;
  score: Score;
};

export default function INSECURE_CONNECTION({
  //   ecosystem,
  //   packageName,
  score,
}: Props) {
  return (
    <div className="text-base font-normal">
      <Header title="INSECURE_CONNECTION">
        The source code url defined is not using a secure <code>https://</code>{" "}
        connection.
      </Header>
      <HowToFix>
        Update the source code <SorceCodeLink url={score.source_url} /> to
        include a secure connection to a source code repository.
      </HowToFix>
    </div>
  );
}
