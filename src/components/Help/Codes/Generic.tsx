import { HelpProps } from "./HelpProps";

export default function Generic({
  note,
  //   ecosystem,
  //   packageName,
  //   score,
}: HelpProps) {
  return (
    <div>
      <h1 className="border-b text-lg text-slate-900">{note.code}</h1>
      {/* Alert Box */}
      <div className="mt-4 border-l-4 border-yellow-500 bg-yellow-100 p-4 text-base font-normal text-slate-900">
        TODO: Add a specific fix for this error code!
      </div>
    </div>
  );
}
