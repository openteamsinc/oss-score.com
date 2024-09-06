import duckdb from "duckdb";

let DB: duckdb.Database | null = null;

export async function initDB(db: duckdb.Database) {
  return new Promise((res) => {
    db.run(
      `
  CREATE SECRET ( TYPE GCS );

  CREATE TABLE scores AS select * from read_parquet('gs://openteams-score-data/2024-09-04/score.parquet');
  
  create table packages as
  select 
      unnest(packages).ecosystem AS ecosystem,
      unnest(packages).name AS name,
      source_url
  from scores;
  
  create index index_ecosystem_name on packages (ecosystem, name);
  
  create index index_source_url on scores (source_url);
  `,
      [],
      () => {
        res(undefined);
      },
    );
  });
}

export async function getDB(): Promise<duckdb.Database> {
  if (DB != null) {
    return DB;
  }
  console.log("cache miss");
  return new Promise((res, rej) => {
    DB = new duckdb.Database(
      ":memory:",
      {
        access_mode: "READ_WRITE",
        max_memory: "512MB",
        threads: "4",
      },
      (err) => {
        if (err) {
          rej(err);
          return;
        }
        initDB(DB as duckdb.Database)
          .then(() => {
            res(DB as duckdb.Database);
          })
          .catch(rej);
      },
    );
  });
}

const db = await getDB();

export async function fetchAll<T>(
  sql: string,
  ...args: unknown[]
): Promise<T[]> {
  return new Promise((res, rej) => {
    db.all(sql, ...args, (err, data) => {
      if (err) {
        rej(err);
        return;
      }
      res(data as T[]);
    });
  });
}

export async function fetchOne<T>(sql: string, ...args: unknown[]): Promise<T> {
  const data = await fetchAll<T>(sql, ...args);
  return data[0];
}
