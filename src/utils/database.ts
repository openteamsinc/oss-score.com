import React from "react";
import duckdb from "duckdb";
import pMemoize from "p-memoize";

const SCORE_LOCATION = process.env.SCORE_LOCATION || ".";

export async function initDB(db: duckdb.Database) {
  console.log(`InitDB - Using score location: ${SCORE_LOCATION}`);
  return new Promise((res, rej) => {
    db.run(
      `
  SET home_directory='/tmp';
  INSTALL httpfs;
  LOAD httpfs; 
  INSTALL parquet;
  LOAD parquet; 

  CREATE SECRET ( TYPE GCS );

  CREATE TABLE notes AS select * from read_parquet('${SCORE_LOCATION}/notes.parquet');
  CREATE TABLE scores AS select * from read_parquet('${SCORE_LOCATION}/score.parquet');
  
  create table packages as
  select 
      unnest(packages).ecosystem AS ecosystem,
      unnest(packages).name AS name,
      source_url
  from scores;
  
  create index index_ecosystem_name on packages (ecosystem, name);
  
  create index index_source_url on scores (source_url);
  `,

      (err) => {
        if (err) {
          console.log(`Error intitializing database: ${err}`);
          rej(err);
          return;
        }
        console.log(`Initialized database`);
        res(undefined);
      },
    );
  });
}

export async function getDB(): Promise<duckdb.Database> {
  console.log("Creating new DB");
  return new Promise((res, rej) => {
    const db = new duckdb.Database(
      ":memory:",
      {
        access_mode: "READ_WRITE",
        max_memory: "512MB",
        threads: "4",
      },
      (err) => {
        if (err) {
          console.log(`Error creating in-memory database: ${err}`);
          rej(err);
          return;
        }
        initDB(db as duckdb.Database)
          .then(() => {
            res(db as duckdb.Database);
          })
          .catch(rej);
      },
    );
  });
}

export const cachedDB = pMemoize(async () => {
  console.log("Cached DB");
  const db = await getDB();
  return db;
});

export async function fetchAll<T>(
  sql: string,
  ...args: unknown[]
): Promise<T[]> {
  const db = await cachedDB();
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
