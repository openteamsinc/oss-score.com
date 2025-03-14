import Link from "next/link";
import { HelpProps } from "./HelpProps";

export default function Generic({
  note,
  source,
  //   ecosystem,
  //   packageName,
  //   score,
}: HelpProps) {
  const { license } = source.license;
  return (
    <div>
      <h1 className="border-b text-lg text-slate-900">{note.code}</h1>
      {/* Alert Box */}
      <div className="mt-4 border-l-4 border-yellow-500 bg-yellow-100 p-4 text-base font-normal text-slate-900">
        The license file appears to be {license}, however it is different
        engough from the{" "}
        <Link
          href={`https://opensource.org/license/${license}`}
          className="text-blue-500 underline"
        >
          {license} open source definition
        </Link>{" "}
        that it should be checked
      </div>
    </div>
  );
}
