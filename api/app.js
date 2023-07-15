"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const courseroutes = require("./routers/course.router");
const quizreoutes = require("./routers/quiz.router");
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//the routes of all the project
const indexRouter = require("./routers/index");
app.use("/", indexRouter);

app.listen(config.port, () =>
  console.log(`App is listening on URI http://localhost:${config.port}`)
);
