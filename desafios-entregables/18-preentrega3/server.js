const dotenv = require('dotenv').config();
const express = require("express");
const app = express();
require("./src/mongodb/mongooseLoader");
const PORT = process.env.PORT || 8080;
const logger = require('./src/utils/logger');

const clusterMode = true;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const errorHandler = require("./src/middlewares/errorHandler");
const notFound = require("./src/middlewares/notFound");

const apiProductos = require('./src/routes/productos');
const apiCarritos = require('./src/routes/carritos');

if (cluster.isMaster && clusterMode) {
  logger.info(`PID MASTER ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', worker => {
    logger.info('Worker', worker.process.pid, 'died', new Date().toLocaleString());
    cluster.fork();
  })
}
else {

  app.use(express.static('./public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/productos', apiProductos);
  app.use('/api/carrito', apiCarritos);

  app.use(errorHandler);
  app.use(notFound);

  const server = app.listen(PORT, () => {
    logger.info(`(Pid: ${process.pid}) Servidor Express escuchando peticiones en el puerto ${server.address().port}`);
  });
  server.on("error", (error) => logger.error(`Error en servidor ${error}`));
}