import Header from "./Header";
import { HelpProps } from "./HelpProps";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FEW_MAX_MONTHLY_AUTHORS({ source }: HelpProps) {
  return (
    <div className="text-base font-normal">
      <Header title="FEW_MAX_MONTHLY_AUTHORS">
        The source code has only been contributed to by{" "}
        {source.max_monthly_authors_count} monthly authors. This could be a
        bottleneck for bug fixes and new releases
      </Header>
    </div>
  );
}
