import { mdiWrench } from "@mdi/js";
import Icon from "@mdi/react";
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

type Props = HelpProps;

export default function RiskHelp({
  note,
  ecosystem,
  packageName,
  score,
  source,
}: Props) {
  if (note == null) {
    return null;
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Icon
          path={mdiWrench}
          className="cursor-pointer text-slate-300 hover:text-slate-500"
          size={0.75}
        />
      </PopoverTrigger>
      <PopoverContent>
        <HelpContent
          note={note}
          ecosystem={ecosystem}
          packageName={packageName}
          score={score}
          source={source}
        />
      </PopoverContent>
    </Popover>
  );
}
