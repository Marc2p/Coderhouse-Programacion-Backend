const Contenedor = require("./contenedor");
const express = require("express");
const app = express();
app.use(express.static("public"));

let productos = new Contenedor("./productos.txt");
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/productos', (req, res) => {
  (async () => {
    await productos.getAll().then((resolve) => {
      res.send(resolve);
    });
  })();
});

app.get('/productoRandom', (req, res) => {
  (async () => {
    let array = await productos.getAll().then((res) => res);
    if(array.length === 0) {
      res.status(404).send('No hay productos');
    }
    else {
      res.send(array[Math.floor(Math.random() * array.length)]);
    }
  })();
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Servidor Express escuchando peticiones en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
