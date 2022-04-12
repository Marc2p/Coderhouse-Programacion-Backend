const {MONGOURL, PORT} = require("./src/config");
require("./src/mongodb/mongooseLoader");
// const {fork} = require('child_process');
const { normalizar, print, denormalizar } = require("./src/utils/normalizar");
const Chat = require("./src/contenedores/chat");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const passportStrategy = require("./src/utils/passport");
const MongoStore = require("connect-mongo");
const flash = require('connect-flash');
const { engine } = require("express-handlebars");
const { Socket } = require("socket.io");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const compression = require('compression');
const logger = require('./src/utils/logger.js');
app.use(compression());

if (cluster.isMaster && PORT.m == 'CLUSTER') {
  logger.info(`PID MASTER ${process.pid}`)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', worker => {
    logger.info('Worker', worker.process.pid, 'died', new Date().toLocaleString())
    cluster.fork()
  })
}
else {
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
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: "AlckejcUi5Jnm3rFhNjUil87",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: MONGOURL,
        ttl: 600000,
        autoRemove: "native",
      }),
    })
  );
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  let chat = new Chat("./contenedores/chat.txt");

  io.on("connection", async (socket) => {
    console.log("Un cliente se ha conectado");

    const arrayDeProductos = await apiProductos.getAll();
    const messages = await chat.getMessages().then((res) => res);
    const normalizedMessages = normalizar(messages);
    const denormalizedMessages = denormalizar(normalizedMessages);

    socket.emit("productos", arrayDeProductos);
    socket.emit("messages", normalizedMessages);

    socket.on("new-product", async (data) => {
      await productos.save(data).then((resolve) => resolve);
      const arrayDeProductos = await apiProductos.getAll();

      io.sockets.emit("productos", arrayDeProductos);
    });

    socket.on("new-message", async (data) => {
      await chat.saveMessages(data).then((resolve) => resolve);
      const messages = await chat.getMessages().then((resolve) => resolve);
      const normalizedMessages = normalizar(messages);
      io.sockets.emit("messages", normalizedMessages);
    });
  });

app.all('/*', (req, res, next) => {
  logger.info(`${req.method} a ${req.path}`);
  next();
})


/* desactivo el child process para el análisis de performance
app.get("/random/:cant?", (req, res) => {
  const forked = fork('./utils/generateRandom.js');
  let cant = +req.params.cant || 100000000;
  forked.send(cant);
  forked.on('message', (numeros) => {
    res.send(numeros.res);
  })
})
*/

apiRouter.post('/signup', passport.authenticate('signup', { successRedirect: '/api', failureRedirect: '/api/errorsignup'}));

const srv = server.listen(PORT.p, () => {
  logger.info(
    `(Pid: ${process.pid}) Servidor Express escuchando peticiones en el puerto ${srv.address().port}`
  );
});
srv.on("error", (error) => logger.error(`Error en servidor ${error}`));
}