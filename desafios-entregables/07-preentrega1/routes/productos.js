const express = require("express");
const productsControllers = require("../controllers/productos");
const middlewares = require("../controllers/middlewares");
const { Router } = express;
const apiProductos = Router();

apiProductos.get("/:id?", productsControllers.getProductos)
.post("/", middlewares.isAdmin, productsControllers.postProductos)
.put("/:id", middlewares.isAdmin, productsControllers.putProductos)
.delete("/:id", middlewares.isAdmin, productsControllers.deleteProductos);

module.exports = apiProductos;
