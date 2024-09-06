import ViewURLButtons from "@/components/viewURLButtons";
import { fetchAll, getDB } from "@/utils/database";
// import duckdb from "duckdb-async";
import { ProjectData } from "@/utils/ProjectInterface";
import { promises as fs } from "fs";
import * as path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  console.log("duckdb");

  const db = await getDB();
  console.log("db", db);
  const rows = await fetchAll("show tables");

  console.log("db", rows);
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
              className="flex h-min w-full flex-col gap-5 rounded border border-slate-300 p-5 shadow-sm"
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
                  <span className="flex items-center gap-2">
                    Maturity:
                    <span className="rounded-full bg-blue-900 px-4 py-2 font-medium text-white">
                      {data.scores.maturity.value}
                    </span>
                  </span>
                  <ul className="mt-5 list-disc pl-5 text-sm text-slate-500">
                    {data.scores.maturity.notes.map((note, noteIndex) => {
                      return <li key={noteIndex}>{note}</li>;
                    })}
                  </ul>
                </div>
                <div className="flex w-full flex-col">
                  <span className="flex items-center gap-2">
                    Health Risk:
                    <span className="rounded-full bg-green-500 px-4 py-2 font-medium text-white">
                      {data.scores.health_risk.value}
                    </span>
                  </span>
                  <ul className="mt-5 list-disc pl-5 text-sm text-slate-500">
                    {data.scores.health_risk.notes.map((note, noteIndex) => {
                      return <li key={noteIndex}>{note}</li>;
                    })}
                  </ul>
                </div>
              </div>
              <ViewURLButtons data={data} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
