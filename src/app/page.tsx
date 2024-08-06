import { promises as fs } from "fs";
import * as path from "path";

interface ProjectData {
  project_name: string;
  source_type: string;
  packages: Array<unknown>;
  scores: {
    maturity: {
      value: string;
      notes: Array<string>;
    };
    health_risk: {
      value: string;
      notes: Array<string>;
    };
  };
}

export default async function Home() {
  const file = await fs.readFile(
    path.join(process.cwd(), "package-json", "pypi.json"),
    "utf8",
  );
  const allData: ProjectData[] = JSON.parse(file);

  return (
    <main className="flex min-h-screen flex-col gap-10 px-40 py-20">
      <h1 className="text-center text-[2.5rem] font-bold">All Projects</h1>
      <div className="grid min-h-screen grid-cols-3 gap-5">
        {allData.map((data, index) => {
          return (
            <div
              key={index}
              className="flex h-min w-full flex-col gap-5 rounded border border-gray-300 p-5 shadow-sm"
            >
              <h2 className="text-xl">
                Project Name:
                <span className="font-semibold">{data.project_name}</span>
              </h2>
              <div className="flex w-full flex-col">
                <span>
                  Source Type:
                  <span className="font-medium">{data.source_type}</span>
                </span>
                <span>
                  Packages:
                  <span className="font-medium">{data.packages.length}</span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex w-full flex-col">
                  <span>
                    Maturity:
                    <span className="px-4 py-2 font-medium text-white bg-blue-900 rounded-full">
                      {data.scores.maturity.value}
                    </span>
                  </span>
                  <ul className="mt-5 list-disc pl-5 text-sm text-gray-500">
                    {data.scores.maturity.notes.map((note, noteIndex) => {
                      return <li key={noteIndex}>{note}</li>;
                    })}
                  </ul>
                </div>
                <div className="flex w-full flex-col">
                  <span>
                    Health Risk:
                    <span className="font-medium text-white bg-green-500 rounded-full px-4 py-2">
                      {data.scores.health_risk.value}
                    </span>
                  </span>
                  <ul className="mt-5 list-disc pl-5 text-sm text-gray-500">
                    {data.scores.health_risk.notes.map((note, noteIndex) => {
                      return <li key={noteIndex}>{note}</li>;
                    })}
                  </ul>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-5 border-t border-gray-300 pt-5">
                <button className="font-semibold text-blue-500 hover:underline text-start">
                  Visit Source
                </button>
                <button className="font-semibold text-blue-500 hover:underline text-end">
                  Visit Homepage
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
