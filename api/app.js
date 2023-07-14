"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const courseroutes = require("./routers/course-routes");
const quizreoutes = require("./routers/quizRoute");
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api", courseroutes.routes);
app.use("/api", quizreoutes.routes);

app.listen(config.port, () =>
  console.log(`App is listening on URI http://localhost:${config.port}`)
);
