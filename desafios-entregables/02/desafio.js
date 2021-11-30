const fs = require("fs");
const { json } = require("stream/consumers");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      const datos = JSON.parse(contenido);
      return datos;
    } catch (error) {
      console.log(error);
    }
  }
  async save (obj) {
    const array = this.getAll().then((res) => {
      if (res.length > 0) {
        obj.id = res.length + 1;
        res.push(obj);
        return obj.id
      }
      else {
        obj.id = 1;
        res.push(obj);
      }
    });
  }
}

let prueba = new Contenedor("./productos.txt");

// prueba.getAll().then((res) => console.log(res[0].id));
console.log (prueba.save({title: 'Computadora', price: 4141.45, thumbnail: 'https://webdeimagenes.com/archivo.png'}));