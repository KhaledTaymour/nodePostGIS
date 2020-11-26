const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

// const pool = require("./db");

const port = 8081;

//#region middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//allowing cross origin (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain (*) you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//#endregion

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

const db = require("./queries");
app.get("/points", db.getPoints); //http://localhost:8081/points
app.get("/dccIncidentsSources", db.getDccIncidentSources); //http://localhost:8081/dccIncidentsSources
