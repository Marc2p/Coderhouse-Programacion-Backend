const express = require("express");
const info = require("../controllers/info");
const { Router } = express;
const infoRouter = Router();

infoRouter.get("/", compression(), info);

module.exports = infoRouter;