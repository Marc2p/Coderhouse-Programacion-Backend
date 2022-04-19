const ProductosDaoMem = require("../api/productos");

const opcion = process.argv[ 2 ] || 'Mem'

let dao;

switch (opcion) {
  case 'File':
    dao = new ProductoDaoFile(rutaArchivoProductos)
    await dao.init()
  break
  default:
    dao = new ProductosDaoMem()
}

module.exports = class ProductDaoFactory {
  static getDao() {
    return dao
  }
}