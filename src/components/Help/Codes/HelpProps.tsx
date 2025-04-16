import { Package, Source } from "@/utils/scoreTypes";

export type Note = {
  code: string;
  description: string;
};

export type HelpProps = {
  note: Note;
  ecosystem: string;
  packageName: string;
  source: Source;
  pkg: Package;
};
