"use strict";
const express = require("express");
const cors = require("cors");
const indexRouter = require("./routers/index");
const bodyParser = require("body-parser");
const config = require("./config");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//the routes of all the project
app.use("/", indexRouter);

app.listen(config.port, () =>
  console.log(`App is listening on URI http://localhost:${config.port}`)
);
