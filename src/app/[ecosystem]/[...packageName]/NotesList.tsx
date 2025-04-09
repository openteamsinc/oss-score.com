import React from "react";

import { mdiAlert } from "@mdi/js";
import Icon from "@mdi/react";

import RiskHelp from "@/components/Help/Risk";

import { NoteDescr, Source } from "@/utils/scoreTypes";

type Props = {
  name: string;
  ecosystem: string;
  notes: { [key: string]: NoteDescr };
  scoreNotes: string[];
  source: Source;
};

export default function NoteList({
  notes,
  ecosystem,
  name,
  source,
  scoreNotes,
}: Props) {
  return (
    <ul className="w-full list-inside space-y-2 px-2 text-xs text-slate-500">
      {scoreNotes
        .filter((n) => n != null)
        .map((noteId, index) => (
          <li key={index} className="mb-2 flex items-start">
            <span className="h-5 px-2">
              <Icon path={mdiAlert} size={"1rem"} className="text-yellow-600" />
            </span>
            <RiskHelp
              note={notes[noteId]}
              ecosystem={ecosystem}
              packageName={name}
              source={source}
            >
              <span className="inline-block cursor-pointer hover:underline">
                {notes[noteId]?.description || `Unknown id ${noteId}`}
              </span>
            </RiskHelp>
          </li>
        ))}
    </ul>
  );
}
