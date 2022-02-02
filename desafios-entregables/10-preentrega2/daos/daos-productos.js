const productsContainer = require ("../models/productos");
let productos = new productsContainer("../models/productos.txt");
module.exports = productos;