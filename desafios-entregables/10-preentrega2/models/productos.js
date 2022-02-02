const fs = require("fs");
const mongoose = require('mongoose');
const models = require("./schemas");

class Productos {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAllProducts() {
    try {
      const contenido = await models.products.find().then((productos) => productos).catch((err) => {
        throw new Error(err);
      });
      if (!contenido) {
        throw new Error("No se encontraron productos");
      }
      return contenido;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const producto = await models.products.findById(mongoose.Types.ObjectId(id)).then((producto) => producto).catch((err) => {
        throw new Error(err);
      });
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      return producto;
    } catch (error) {
      throw error;
    }
  }

  async saveProduct(obj) {
    try {
      obj.id = new mongoose.Types.ObjectId();
      obj.timestamp = Date.now();
      const productoSaveModel = new models.products(obj);
      const savedProduct = await models.products.insertMany(productoSaveModel).then((producto) => producto).catch((err) => console.log (err));
      return savedProduct;
    } catch (error) {
      throw error;
    }
  }

  /* no se usa
  async deleteAllProducts() {
    try {
      const array = await this.getAllProducts().then((res) => res).catch((error) => {
        throw error;
      });
      if (array.length <= 0) {
        throw new Error('No se encontraron productos');
      }
      const deletedProducts = await models.products.deleteMany().then((deleted) => deleted).catch((err) => {
        throw new Error(err);
      });
      return deletedProducts;
    } catch (error) {
      throw error;
    }
  } */
  
  async deleteProductById(id) {
    try {
      const producto = await this.getProductById(id).then((product) => product).catch((err) => {
        throw new Error(err);
      });
      if (!producto) {
        throw new Error ("Producto no encontrado");
      }
      const deletedProduct = await models.products.deleteOne(producto).then((deleted) => deleted).catch((err) => {
        throw new Error(err);
      });
      return deletedProduct;
    }    catch (error) {
      throw error;
    }
  }

  async updateProduct(id, title, description, code, price, thumbnail, stock) {
    try {
      const producto = await this.getProductById(id).then((product) => product).catch((err) => {
        throw new Error(err);
      });
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      const updatedProduct = await models.products.findByIdAndUpdate(id, { $set: {
        title: title,
        description: description,
        code: code,
        price: price,
        thumbnail: thumbnail,
        stock: stock
      }}, { new: true}).then((product) => product).catch((err) => {
        throw new Error(err);
      });
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Productos;
