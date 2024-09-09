import { Score } from "@/utils/score";

type Props = {
  code: string;
  ecosystem: string;
  packageName: string;
  score: Score;
};

export default function Generic({
  code,
  //   ecosystem,
  //   packageName,
  //   score,
}: Props) {
  return (
    <div>
      <h1 className="border-b text-lg text-slate-900">{code}</h1>
      <div>
        <h2 className="mb-2 text-base text-slate-900">What could this mean?</h2>
        <p></p>
        <h2 className="mb-2 text-base text-slate-900">How to Fix</h2>
        <p></p>
      </div>
    </div>
  );
}
