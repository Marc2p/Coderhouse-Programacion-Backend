const Contenedor = require("./contenedor");
const express = require("express");
const { engine } = require('express-handlebars');
const { Socket } = require("socket.io");
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

const { Router } = express;
const apiRouter = Router();

app.engine('hbs', engine(
  {
    defaultLayout: 'index',
    extname: ".hbs",
        }));
app.set('view engine', 'hbs');
app.set("views", "./views");

app.use(express.static('./public'));
app.use("/", apiRouter);
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

let productos = new Contenedor("./productos.txt");

io.on('connection', async (Socket) => {
  console.log('Un cliente se ha conectado');
  const arrayDeProductos = await productos.getAll().then((resolve) => resolve);
  Socket.emit('productos', arrayDeProductos);
});

apiRouter.get('/', async (req, res, next) => {
  res.render('form-new-product');
});

apiRouter.get("/productos", async (req, res, next) => {
  try {
    const arrayDeProductos = await productos
      .getAll()
      .then((resolve) => resolve);
    if (arrayDeProductos.length === 0) {
      throw new Error("No hay productos");
    }
    res.render('datos', {arrayDeProductos});
  } catch (err) {
    next(err);
  }
});

apiRouter.get("/productos/:id", async (req, res, next) => {
  try {
    const producto = await productos
      .getById(Number(req.params.id))
      .then((resolve) => resolve);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    res.json(producto);
  } catch (err) {
    next(err);
  }
});

apiRouter.post("/productos", async (req, res, next) => {
  try {
    const nombresValidos = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s]+$/;
    if (!req.body.title || !req.body.price || !req.body.thumbnail) {
      throw new Error("Debes enviar un producto con nombre, precio y URL");
    }
    if (req.body.price <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    if (!nombresValidos.exec(req.body.title)) {
      throw new Error('El nombre solo puede contener letras, números y espacios');
    }
    await productos.save(req.body).then((resolve) => {
      res.redirect('/');
    });
  } catch (err) {
    next(err);
  }
});

apiRouter.put("/productos/:id", async (req, res, next) => {
  try {
    const producto = await productos
      .getById(Number(req.params.id))
      .then((res) => res);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    await productos
      .update(
        Number(req.params.id),
        req.body.title,
        req.body.price,
        req.body.thumbnail
      )
      .then((resolve) => {
        res.json(resolve);
      });
  } catch (err) {
    next(err);
  }
});
apiRouter.delete("/productos/:id", async (req, res, next) => {
  try {
    const producto = await productos
      .getById(Number(req.params.id))
      .then((resolve) => resolve);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    await productos.deleteById(Number(req.params.id)).then((resolve) => {
      res.json(`${producto.title} se borro con éxito`);
    });
  } catch (err) {
    next(err);
  }
});

function handleErrors(err, req, res, next) {
  console.log(err.message);
  res.render('datos', { err });
}
apiRouter.use(handleErrors);

const PORT = process.env.PORT || 8080;
const srv = server.listen(PORT, () => {
  console.log(
    `Servidor Express escuchando peticiones en el puerto ${
      srv.address().port
    }`
  );
});
srv.on("error", (error) => console.log(`Error en servidor ${error}`));
