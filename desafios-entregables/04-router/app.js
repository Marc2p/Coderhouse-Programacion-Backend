const Contenedor = require("./contenedor");
const express = require("express");
const app = express();
const { Router } = express;
const apiRouter = Router();
app.use("/api/productos", apiRouter);
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let productos = new Contenedor("./productos.txt");

apiRouter.get("/", async (req, res, next) => {
  try {
    const arrayDeProductos = await productos
      .getAll()
      .then((resolve) => resolve);
    if (arrayDeProductos.length === 0) {
      throw new Error("No se encontraron productos");
    }
    res.json(arrayDeProductos);
  } catch (err) {
    next(err);
  }
});

apiRouter.get("/:id", async (req, res, next) => {
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

apiRouter.post("/", async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.price || !req.body.thumbnail) {
      throw new Error("Debes enviar un producto con nombre, precio y URL");
    }
    await productos.save(req.body).then((resolve) => {
      res.json(resolve);
    });
  } catch (err) {
    next(err);
  }
});

apiRouter.put("/:id", async (req, res, next) => {
  try {
    const producto = await productos
      .getById(Number(req.params.id))
      .then((resolve) => resolve);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    if (!req.body.title || !req.body.price || !req.body.thumbnail) {
      throw new Error("Debes enviar un producto con nombre, precio y URL");
    }
    const productoActualizado = {
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
    };
    await productos.deleteById(Number(req.params.id));
    await productos.save(productoActualizado).then((resolve) => {
      res.json(resolve);
    });
  } catch (err) {
    next(err);
  }
});
apiRouter.delete("/:id", async (req, res, next) => {
  try {
    const producto = await productos
      .getById(Number(req.params.id))
      .then((resolve) => resolve);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    await productos.deleteById(Number(req.params.id)).then((resolve) => {
      res.json("Producto borrado");
    });
  } catch (err) {
    next(err);
  }
});

function handleErrors(err, req, res, next) {
  console.log(err.message);
  res.status(500).send({ error: err.message });
}
apiRouter.use(handleErrors);

const server = app.listen(8080, () => {
  console.log(
    `Servidor Express escuchando peticiones en el puerto ${
      server.address().port
    }`
  );
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
