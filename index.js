const express = require("express");
const port = process.env.PORT || 4001;
const cors = require("cors");
//const bodyParser = require("body-parser");
const router = require("./comment/router");


const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);

const parserMiddleware = express.json();
app.use(parserMiddleware);

app.use(router);

app.listen(port, () => console.log(`Hey, I'm listening on port ${port}!`));

