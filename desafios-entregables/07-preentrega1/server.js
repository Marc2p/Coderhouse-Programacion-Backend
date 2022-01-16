const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const admin = true;

const apiProductos = require('./controllers/productos')
const apiCarritos = require('./controllers/carritos')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/productos', (req, res, next) => {
  if (!admin) {
    res.status(403).json({error: 403, descripcion: `ruta ${req.url} método ${req.method} no autorizado`});
  } else {
    next();
  }
});
app.put('/api/productos/:id', (req, res, next) => {
  if (!admin) {
    res.status(403).json({error: 403, descripcion: `ruta ${req.url} método ${req.method} no autorizado`});
  } else {
    next();
  }
});
app.delete('/api/productos/:id', (req, res, next) => {
  if (!admin) {
    res.status(403).json({error: 403, descripcion: `ruta ${req.url} método ${req.method} no autorizado`});
  } else {
    next();
  }
});

app.use('/api/productos', apiProductos);
app.use('/api/carrito', apiCarritos);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(400).json({"error": 400, "descripcion": error.message});
});
app.use((req, res, next) => {
  res.status(404).json({error: 404, descripcion: `Ruta ${req.url} método ${req.method} no implementados`});
});

const server = app.listen(PORT, () => {
  console.log(`Servidor Express escuchando peticiones en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
