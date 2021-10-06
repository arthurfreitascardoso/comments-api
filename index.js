const express = require("express");
const port = process.env.PORT || 4001;
const db = require("./db");
const Event = require("./comment/model");
const cors = require("cors");
//const bodyParser = require("body-parser");
const router = require("./comment/router");
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);

const parserMiddleware = express.json();
app.use(parserMiddleware);

app.use(router);

app.listen(port, () => console.log(`Hey, I'm listening on port ${port}!`));

module.exports = pool;