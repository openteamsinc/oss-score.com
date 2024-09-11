import React from "react";
import duckdb from "duckdb";

import path from "path";

const dbPath = path.join(process.cwd(), "public/scores.duckdb");
console.log("Creating new DB", { dbPath });

const db = new duckdb.Database(
  dbPath,
  {
    access_mode: "READ_ONLY",
    max_memory: "512MB",
    threads: "4",
  },
  (err) => {
    if (err) {
      console.log(`Error creating in-memory database: ${err}`);
      return;
    }
  },
);

// export async function getDB(): Promise<duckdb.Database> {
//   const PROJECT_ROOT = getConfig().serverRuntimeConfig.PROJECT_ROOT;
//   const dbPath = path.join(process.cwd(), "public/scores.duckdb");
//   console.log("Creating new DB", { PROJECT_ROOT, dbPath });
//   return new Promise((res, rej) => {
//     const db = new duckdb.Database(
//       dbPath,
//       {
//         access_mode: "READ_ONLY",
//         max_memory: "512MB",
//         threads: "4",
//       },
//       (err) => {
//         if (err) {
//           console.log(`Error creating in-memory database: ${err}`);
//           rej(err);
//           return;
//         }
//         res(db as duckdb.Database);
//         // initDB(db as duckdb.Database)
//         //   .then(() => {
//         //   })
//         //   .catch(rej);
//       },
//     );
//   });
// }

export async function fetchAll<T>(
  sql: string,
  ...args: unknown[]
): Promise<T[]> {
  return new Promise((res, rej) => {
    console.log(`Executing duckdb query`);
    db.all(sql, ...args, (err, data) => {
      if (err) {
        rej(err);
        return;
      }
      res(data as T[]);
    });
  });
}

export type NoteRow = {
  code: string;
  note: string;
  id: number;
};
export type Notes = {
  [key: string]: NoteRow;
};

export async function fetchNotes() {
  return fetchAll<NoteRow>(`select * from notes`);
}

export const cachedNotes = React.cache(async () => {
  const notes = await fetchNotes();
  const result = Object.fromEntries(notes.map((note) => [note.id, note]));
  return result as Notes;
});

export async function fetchOne<T>(sql: string, ...args: unknown[]): Promise<T> {
  const data = await fetchAll<T>(sql, ...args);
  return data[0];
}
