const productModel = require("../models/productSchema");

class Productos {
  constructor() {}
  
  async getAllProducts() {
    try {
      const contenido = await productModel.find().then((productos) => productos).catch((err) => {
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
      const producto = await productModel.findById(id).then((producto) => producto).catch((err) => {
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
      obj.timestamp = Date.now();
      const productoSaveModel = new productModel(obj);
      const savedProduct = await productModel.insertMany(productoSaveModel).then((producto) => producto).catch((err) => {
        throw new Error(err);
      });
      return savedProduct;
    } catch (error) {
      throw error;
    }
  }
  
  async deleteProductById(id) {
    try {
      const producto = await this.getProductById(id).then((product) => product).catch((err) => {
        throw new Error(err);
      });
      if (!producto) {
        throw new Error ("Producto no encontrado");
      }
      const deletedProduct = await productModel.deleteOne(producto).then((deleted) => deleted).catch((err) => {
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
      const updatedProduct = await productModel.findByIdAndUpdate(id, { $set: {
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
