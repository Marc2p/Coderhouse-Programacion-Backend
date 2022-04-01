const models = require("../models/schemas");

class Carritos {
  constructor() {}

  async getProductsFromCart(id) {
    try {
      const carrito = await models.Carritos.findById(id).then((carrito) => carrito).catch((err) => {
        throw new Error(err);
      });
      if (!carrito) {
        throw new Error("Carrito no encontrado");
      }
      const productos = await models.Carritos.findById(id).populate('productos').then((productos) => productos).catch((err) => {
        throw new Error(err);
      })
      if (!productos) {
        throw new Error("No hay productos en el carrito");
      }
      return productos;
    } catch (error) {
      throw error;
    }
  }
  
  async createCart(obj) {
    try {
      obj.timestamp = Date.now();
      const carritoSaveModel = new models.Carritos(obj);
      const savedCart = await models.Carritos.insertMany(carritoSaveModel).then((carrito) => carrito).catch((err) => {
        throw new Error(err);
      });
      return savedCart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(id, product) {
    try {
      const carrito = await models.Carritos.findByIdAndUpdate(id, { $push: { productos: product }}, { new: true}).then((carrito) => carrito).catch((err) => {
        throw new Error(err);
      });
      return carrito;
    } catch (error) {
      throw error;
    }
  }
  
  async deleteCartById(id) {
    try {
      const carrito = await models.Carritos.findById(id).then((cart) => cart).catch((err) => {
        throw new Error(err);
      });
      if (!carrito) {
        throw new Error ("Carrito no encontrado");
      }
      const deletedCart = await models.Carritos.deleteOne(carrito).then((deleted) => deleted).catch((err) => {
        throw new Error(err);
      });
      return deletedCart;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductFromCart(id, id_prod) {
    try {
      const carrito = await models.Carritos.findById(id).then((carrito) => carrito).catch((err) => {
        throw new Error(err);
      });
      if (!carrito) {
        throw new Error("Carrito no encontrado");
      }
      const product = await models.Carritos.findOne({ _id: id, productos: id_prod}).then((product) => product).catch((err) => {
        throw new Error(err);
      });
      if (!product) {
        throw new Error("Producto no encontrado en el carrito");
      }
      const deleteProduct = await models.Carritos.findByIdAndUpdate(id, { $pull: { productos: id_prod}}, { new: true}).then((product) => product).catch((err) => {
        throw new Error(err);
      });
      return product;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = Carritos;