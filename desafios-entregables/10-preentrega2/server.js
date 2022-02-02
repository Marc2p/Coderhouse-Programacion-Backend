const express = require("express");
const app = express();
const middlewares = require("./controllers/middlewares");
const PORT = process.env.PORT || 8080;

const apiProductos = require('./routes/productos')
const apiCarritos = require('./routes/carritos')

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', apiProductos);
app.use('/api/carrito', apiCarritos);

app.use(middlewares.errorHandler);
app.use(middlewares.notFound);

const server = app.listen(PORT, () => {
  console.log(`Servidor Express escuchando peticiones en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
