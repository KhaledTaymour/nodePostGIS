var config = require("./config.json");

const Pool = require("pg").Pool;

const pool = new Pool({
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password,
});

module.exports = pool;
