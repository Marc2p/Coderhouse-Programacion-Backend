const express = require("express");
const { Router } = express;
const apiCarritos = Router();

apiCarritos
  .get("/:id/productos", (req, res) => {
    res.send("all works!");
  })
  .post("/", (req, res) => {
    res.send("ok");
  })
  .post('/:id/productos', (req, res) => {
    res.send('Post ok');
  })
  .delete("/:id/productos/:id_prod", (req, res) => {
    res.send("Delete OK");
  })
  .delete("/:id", (req, res) => {
    res.send("delete ok");
  });

module.exports = apiCarritos;
