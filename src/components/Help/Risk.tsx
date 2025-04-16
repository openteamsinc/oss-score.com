import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import HelpContent from "./Codes";
import { HelpProps } from "./Codes/HelpProps";

export type Note = {
  code: string;
  description: string;
};

type Props = HelpProps & {
  children: React.ReactNode;
};

export default function RiskHelp({
  note,
  ecosystem,
  packageName,
  source,
  children,
  pkg,
}: Props) {
  if (note == null) {
    return null;
  }
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <HelpContent
          note={note}
          ecosystem={ecosystem}
          packageName={packageName}
          source={source}
          pkg={pkg}
        />
      </PopoverContent>
    </Popover>
  );
}
