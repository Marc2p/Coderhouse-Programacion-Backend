const Productos = require("../models/productos");
const express = require("express");
const { Router } = express;
const apiProductos = Router();
let productos = new Productos("./models/productos.txt");

apiProductos
  .get("/:id?", async (req, res, next) => {
    try {
      if (!req.params.id) {
        const arrayDeProductos = await productos
          .getAll()
          .then((resolve) => resolve);
        if (arrayDeProductos.length === 0) {
          throw new Error("No hay productos");
        }
        res.json(arrayDeProductos);
      }
      const producto = await productos
        .getById(Number(req.params.id))
        .then((resolve) => resolve);
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      res.json(producto);
    } catch (error) {
      next(error);
    }
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
