const express = require("express");
const siginRouter = express.Router();
const Sigincontroller = require("../Controller/SiginController");

siginRouter.post("/getSigininInfo", Sigincontroller.getSiginin);

module.exports = siginRouter;
