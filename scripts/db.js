const duckdb = require("duckdb");
require("dotenv").config();

const SCORE_LOCATION = process.env.SCORE_LOCATION;

const sql = `
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
`;

const db = new duckdb.Database("scores.duckdb", {}, (err) => {
  if (err) {
    console.log(err);
    throw err;
  }

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
});
