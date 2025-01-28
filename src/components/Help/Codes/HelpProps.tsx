import { Score } from "@/utils/score_res";

export type Note = {
  code: string;
  description: string;
};

export type HelpProps = {
  note: Note;
  ecosystem: string;
  packageName: string;
  score: Score;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any;
};
