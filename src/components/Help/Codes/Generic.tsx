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
      {/* Alert Box */}
      <div className="mt-4 border-l-4 border-yellow-500 bg-yellow-100 p-4 text-base font-normal text-slate-900">
        TODO: Add a specific fix for this error code!
      </div>
    </div>
  );
}
