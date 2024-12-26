import { mdiWrench } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NoteRow } from "@/utils/database";

import HelpContent from "./Codes";
import { Score } from "@/utils/score_res";

type Props = {
  note: NoteRow;
  ecosystem: string;
  packageName: string;
  score: Score;
};
export default function RiskHelp({
  note,
  ecosystem,
  packageName,
  score,
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
          code={note.code}
          ecosystem={ecosystem}
          packageName={packageName}
          score={score}
        />
      </PopoverContent>
    </Popover>
  );
}
