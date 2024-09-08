const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  password:process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT, // default Postgres port
  database: process.env.PG_DATABASE,
});

module.exports = {
  query: (text: string, params: string[]) => pool.query(text, params),
};
