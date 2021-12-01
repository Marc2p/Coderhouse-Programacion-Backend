const Contenedor = require("./desafio");

let test = new Contenedor("./productos.txt");
(async () => {
  console.log("Probamos obtener todos los datos con getAll");
  await test.getAll().then((res) => console.log(res));
  console.log("Ahora probamos guardar un objeto nuevo, debería devolver id");
  await test
    .save({
      title: "Computadora",
      price: 51222,
      thumbnail: "https://webdeimagenes.com/archivo.png",
    })
    .then((res) => console.log(res));
  console.log(
    "Probamos obtener todos los objetos de nuevo para verificar que se haya guardado bien"
  );
  await test.getAll().then((res) => console.log(res));
  console.log(
    "Probamos obtener un objeto por su id. Si no existe, devuelve Null"
  );
  await test.getById(2).then((res) => console.log(res));
  console.log(
    "Probamos borrar un objeto por su id, devuelve undefined y el id de cada objeto se acomoda para que no se desordene ni se repita, por tanto otro objeto ocupará el id del objeto borrado"
  );
  await test.deleteById(4).then((res) => console.log(res));
  console.log(
    "Probamos borrar todos los objetos. Destrucción total en 3 2 1... devuelve undefined"
  );
  await test.deleteAll().then((res) => console.log(res));
  console.log(
    "Comprobamos con nuestro querido getAll que después de tanto esfuerzo, solo queda un array vacío"
  );
  await test.getAll().then((res) => console.log(res));
  console.log("Fin de las pruebas");
})();
