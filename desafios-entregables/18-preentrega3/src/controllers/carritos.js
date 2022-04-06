const logger = require('../utils/logger');
const nodemailer = require("nodemailer");
const Carritos = require("../daos/carritos");
const Productos = require("../daos/productos");

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'marion.kuphal90@ethereal.email',
    pass: 'HPEunpnpNT63t3xhjC'
  }
});

let carritos = new Carritos();
let productos = new Productos();

const getProductsFromCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    const productsOfCart = await carritos.getProductsFromCart(id).then((res) => res);
    if (!productsOfCart) {
      throw new Error('Ese carrito no existe o no tiene productos');
    }
    res.json(productsOfCart);
  } catch (error) {
    next (error);
  }
}

const postCart = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const {id_product}= req.body;
      const userid = req.user._id;
      const producto = await productos.getProductById(id_product).then((res) => res);
      if (!producto) {
        throw new Error('No se puede crear el carrito porque el producto no existe');
      }
      const carrito = {productos: producto._id, usuario: userid};
      const cart = await carritos.createCart(carrito).then((res) => res);
      res.json(cart);
    }
    else {
      throw new Error("Debes estar autenticado para crear un carrito");
    } 
  } catch (error) {
    next(error);
  }
}

const addProductToCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {id_product}= req.body;
    const producto = await productos.getProductById(id_product).then((res) => res);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    const cart = await carritos.addProductToCart(id, producto._id).then((res) => res);
    if (!cart) {
      throw new Error('Ese carrito no existe');
    }
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

const deleteProductFromCart = async (req, res, next) => {
  try {
    const id_product = req.params.id_prod;
    const id = req.params.id;
    const producto = await productos.getProductById(id_product).then((res) => res);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    const cart = await carritos.deleteProductFromCart(id, id_product).then((res) => res);
    if (!cart) {
      throw new Error('Carrito o producto no encontrados')
    }
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

const deleteCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cart = await carritos.deleteCartById(id).then((res) => res);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

const procesar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cart = await carritos.getProductsFromCart(id).then((res) => res);
    if (!cart) {
      throw new Error('Ese carrito no existe o no tiene productos');
    }
    if (req.isAuthenticated()) {
      if (cart.usuario.username === req.user.username) {
        let mailOptions = {
          from: "Preentrega 3 Marcos Peirone",
          to: "marion.kuphal90@ethereal.email",
          subject: `Nuevo pedido de ${cart.usuario.name} (${cart.usuario.username})`,
          text: `Productos a comprar:
          ${cart.productos}`
        };
        let info = transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            logger.error("Error al enviar mail: " + err);
          } else {
            logger.info("Message sent: %s", info.messageId);
            logger.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          }
        });
      } else {
        throw new Error("Ese carrito no te corresponde");
      }
      res.json({"Pedido enviado": cart});
    } else {
      throw new Error("Debes estar autenticado para enviar pedidos");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { getProductsFromCart, postCart, addProductToCart, deleteProductFromCart, deleteCart, procesar };
