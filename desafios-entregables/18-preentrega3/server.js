const dotenv = require('dotenv').config();
const express = require("express");
const app = express();
require("./src/mongodb/mongooseLoader");
const PORT = process.env.PORT || 8080;

const errorHandler = require("./src/middlewares/errorHandler");
const notFound = require("./src/middlewares/notFound");

const apiProductos = require('./src/routes/productos');
const apiCarritos = require('./src/routes/carritos');

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', apiProductos);
app.use('/api/carrito', apiCarritos);

app.use(errorHandler);
app.use(notFound);

const server = app.listen(PORT, () => {
  console.log(`Servidor Express escuchando peticiones en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
