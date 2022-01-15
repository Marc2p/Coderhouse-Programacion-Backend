const express = require("express");
const { Router } = express;
const apiProductos = Router();

apiProductos
  .get("/:id?", (req, res) => {
    res.send("all works!");
  })
  .post("/", (req, res) => {
    res.send("ok");
  })
  .put("/:id", (req, res) => {
    res.send("Put OK");
  })
  .delete("/:id", (req, res) => {
    res.send("delete ok");
  });

module.exports = apiProductos;
