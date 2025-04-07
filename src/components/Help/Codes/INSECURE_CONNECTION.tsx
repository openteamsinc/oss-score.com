import SourceCodeLink from "@/components/SourceCodeLink";

import HowToFix from "./HowtoFix";
import Header from "./Header";
import { HelpProps } from "./HelpProps";

export default function INSECURE_CONNECTION({ source }: HelpProps) {
  return (
    <div className="text-base font-normal">
      <Header title="INSECURE_CONNECTION">
        The source code url defined is not using a secure <code>https://</code>{" "}
        connection.
      </Header>
      <HowToFix>
        Update the source code <SourceCodeLink url={source.source_url} /> to
        include a secure connection to a source code repository.
      </HowToFix>
    </div>
  );
}
