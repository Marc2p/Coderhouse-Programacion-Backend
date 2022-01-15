const Productos = require("./models/productos");
const Carritos = require("./models/carritos");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
  console.log(
    `Servidor Express escuchando peticiones en el puerto ${
      server.address().port
    }`
  );
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
