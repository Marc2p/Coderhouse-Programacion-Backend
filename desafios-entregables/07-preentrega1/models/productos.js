const fs = require("fs");

class Productos {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      if (!contenido) {
        const productos = [];
        fs.writeFileSync(this.archivo, JSON.stringify(productos));
        return productos;
      }
      const datos = JSON.parse(contenido);
      return datos;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const array = await this.getAll()
        .then((res) => res)
        .catch((err) => {
          throw err;
        });
      if (array.length <= 0) {
        return null;
      }
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          return array[i];
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Productos;