var config = require("./config.json");

const { Client } = require("pg");
const client = new Client({
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password,
});

client
  .connect()
  .then(() => console.log("connected"))
  .catch((err) => console.error("connection error", err.stack));

/**
 * Make sure of config "database": "gisdb"
 */
const getPoints = (request, response) => {
  client.query(
    "select id, ST_X (ST_Transform (geom, 4326)) AS long, ST_Y (ST_Transform (geom, 4326)) AS lat FROM points",
    (err, res) => {
      if (err) throw err;
      response.json(res.rows);
    }
  );
};

/**
 * Make sure of config "database": "lookups"
 */
const getDccIncidentSources = (request, response) => {
  client.query("select source_id, source_name FROM dcc_source", (err, res) => {
    if (err) throw err;
    response.json(res.rows);
  });
};

module.exports = {
  getPoints,
  getDccIncidentSources,
};
