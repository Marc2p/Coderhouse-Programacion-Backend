const { normalize, schema } = require('normalizr');
const util = require('util')
const ApiProductosMock = require("./api/productos");
const apiProductos = new ApiProductosMock()
const Chat = require("./contenedores/chat");
const express = require("express");
const { engine } = require("express-handlebars");
const { Socket } = require("socket.io");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const author = new schema.Entity('author');
const text = new schema.Entity('text', {
  author: author
});
const print = (obj) => {
  console.log(util.inspect(obj, false, 12, true))
}

const { Router } = express;
const apiRouter = Router();

app.engine(
  "hbs",
  engine({
    defaultLayout: "index",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("./public"));
app.use("/api", apiRouter);
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

let chat = new Chat('./contenedores/chat.txt');

io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");

  const arrayDeProductos = await apiProductos.getAll()
  const messages = await chat.getMessages().then((res) => res);
  const normalizedMessages = normalize(messages, text);
  console.log(normalizedMessages);
  print(normalizedMessages)

  socket.emit("productos", arrayDeProductos);
  socket.emit("messages", messages);

  socket.on("new-product", async (data) => {
    await productos.save(data).then((resolve) => resolve);
    const arrayDeProductos = await apiProductos.getAll()

    io.sockets.emit("productos", arrayDeProductos);
  });

  socket.on("new-message", async (data) => {
    await chat.saveMessages(data).then((resolve) => resolve);
    const messages = await chat.getMessages().then((resolve) => resolve);
    io.sockets.emit("messages", messages);
  });
});

apiRouter.get("/", async (req, res, next) => {
  res.render("form-new-product");
});

apiRouter.get("/productos-test", async (req, res, next) => {
  try {
    const arrayDeProductos = await apiProductos.getAll()
    if (arrayDeProductos.length === 0) {
      throw new Error("No hay productos");
    }
    res.render("datos", { arrayDeProductos });
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
    res.json(await apiProductos.popular(req.query.cant))
  } catch (err) {
    next(err)
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
  res.render("datos", { err });
}
apiRouter.use(handleErrors);

const PORT = process.env.PORT || 8080;
const srv = server.listen(PORT, () => {
  console.log(
    `Servidor Express escuchando peticiones en el puerto ${srv.address().port}`
  );
});
srv.on("error", (error) => console.log(`Error en servidor ${error}`));
