const Carritos = require("../models/carritos");
const Productos = require("../models/productos");
const express = require("express");
const { Router } = express;
const apiCarritos = Router();
let carritos = new Carritos("./models/carritos.txt");
let productos = new Productos("./models/productos.txt");

apiCarritos
  .get("/:id/productos", async (req, res, next) => {
    try {
      const productOfCart = await carritos.getProductsFromCart(Number(req.params.id)).then((res) => res);
      if (!productOfCart) {
        throw new Error('Ese carrito no existe o no tiene productos');
      }
      res.json(productOfCart);
    } catch (error) {
      next (error);
    }
  })
  .post("/", async (req, res, next) => {
    try {
      const {id_product}= req.body;
      const producto = await productos.getProductById(id_product).then((res) => res);
      if (!producto) {
        throw new Error('No se puede crear el carrito porque el producto no existe');
      }
      const carrito = {productos: [producto]};
      const cart = await carritos.createCart(carrito).then((res) => res);
      res.json(cart.id);
    } catch (error) {
      next(error);
    }
  })
  .post('/:id/productos', async (req, res, next) => {
    try {
      const {id_product}= req.body;
      const producto = await productos.getProductById(id_product).then((res) => res);
      if (!producto) {
        throw new Error('Producto no encontrado');
      }
      const cart = await carritos.addProductToCart(Number(req.params.id), producto).then((res) => res);
      if (!cart) {
        throw new Error('Ese carrito no existe');
      }
      res.json(cart);
    } catch (error) {
      next(error);
    }
  })
  .delete("/:id/productos/:id_prod", async (req, res, next) => {
    try {
      const {id_product}= Number(req.params.id_prod);
      const producto = await productos.getProductById(Number(req.params.id_prod)).then((res) => res);
      if (!producto) {
        throw new Error('Producto no encontrado');
      }
      const cart = await carritos.deleteProductFromCart(Number(req.params.id), Number(req.params.id_prod)).then((res) => res);
      if (!cart) {
        throw new Error('Carrito o producto no encontrados')
      }
      res.json(cart);
    } catch (error) {
      next(error);
    }
  })
  .delete("/:id", async (req, res, next) => {
    try {
      const cart = await carritos.deleteCartById(Number(req.params.id)).then((res) => res);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      res.json(cart);
    } catch (error) {
      next(error);
    }
  });

module.exports = apiCarritos;
