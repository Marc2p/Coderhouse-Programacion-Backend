const Productos = require("../models/productos");
const express = require("express");
const { Router } = express;
const apiProductos = Router();
let productos = new Productos("./models/productos.txt");

apiProductos
  .get("/:id?", async (req, res, next) => {
    try {
      if (!req.params.id) {
        const arrayDeProductos = await productos.getAllProducts().then((resolve) => resolve);
        if (arrayDeProductos.length <= 0) {
          throw new Error("No hay productos");
        }
        res.json({"productos": arrayDeProductos, "admin": admin});
      }
      const producto = await productos.getProductById(Number(req.params.id)).then((resolve) => resolve);
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      res.json(producto);
    } catch (error) {
      next(error);
    }
  })
  .post("/", async (req, res, next) => {
    try {
      const { title, description, code, price, thumbnail, stock } = req.body;
      const nombresValidos = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s]+$/;
      if (!title || !description || !code || !price || !thumbnail || !stock) {
        throw new Error("Debes enviar un producto con nombre, descripción, código, precio, URL y stock");
      }
      if (price <= 0) {
        throw new Error("El precio debe ser mayor a 0");
      }
      if (!nombresValidos.exec(title)) {
        throw new Error("El nombre solo puede contener letras, números y espacios");
      }
      if (!nombresValidos.exec(description)) {
        throw new Error("La descripción solo puede contener letras, números y espacios");
      }
      await productos.saveProduct(req.body).then((resolve) => {
        res.json(resolve);
      });
    } catch (error) {
      next(error);
    }
  })
  .put("/:id", async (req, res, next) => {
    try {
      const { title, description, code, price, thumbnail, stock } = req.body;
      const nombresValidos = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s]+$/;
      const producto = await productos.getProductById(Number(req.params.id)).then((res) => res);
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      if (price <= 0) {
        throw new Error("El precio debe ser mayor a 0");
      }
      if (title && !nombresValidos.exec(title)) {
        throw new Error("El nombre solo puede contener letras, números y espacios");
      }
      if (description && !nombresValidos.exec(description)) {
        throw new Error("La descripción solo puede contener letras, números y espacios");
      }
      await productos.updateProduct(
        Number(req.params.id),
        title,
        description,
        code,
        price,
        thumbnail,
        stock
      ).then((resolve) => {
        res.json(resolve);
      });
    } catch (error) {
      next(error);
    }
  })
  .delete("/:id", async (req, res, next) => {
    try {
      const producto = await productos.getProductById(Number(req.params.id)).then((resolve) => resolve);
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      await productos.deleteProductById(Number(req.params.id)).then((resolve) => {
        res.json(`${producto.title} se borro con éxito`);
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = apiProductos;
