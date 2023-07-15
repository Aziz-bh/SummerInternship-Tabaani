const express = require("express");
const Userouter = express.Router();

const { SubscribeToCourse } = require("../Controllers/userController");

Userouter.post("/subscribe", SubscribeToCourse);

module.exports = Userouter;
