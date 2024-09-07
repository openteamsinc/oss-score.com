import duckdb from "duckdb";

const SCORE_LOCATION = process.env.SCORE_LOCATION || "score.parquet";

let DB: duckdb.Database | null = null;

export async function initDB(db: duckdb.Database) {
  return new Promise((res, rej) => {
    db.run(
      `
  INSTALL httpfs;
  LOAD httpfs; 
  INSTALL parquet;
  LOAD parquet; 

  CREATE SECRET ( TYPE GCS );

  CREATE TABLE scores AS select * from read_parquet('${SCORE_LOCATION}');
  
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
          rej(err);
          return;
        }
        res(undefined);
      },
    );
  });
}

export async function getDB(): Promise<duckdb.Database> {
  if (DB != null) {
    return DB;
  }
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

export async function fetchAll<T>(
  sql: string,
  ...args: unknown[]
): Promise<T[]> {
  const db = await getDB();
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
