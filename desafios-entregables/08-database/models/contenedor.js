const knex = require("./knex-productos");

class Contenedor {
  constructor(knex, table) {
    this.knex = knex;
    this.table = table;
  }

  async getAll() {
    try {
      const productos = await this.knex.from(this.table).select('*');
      return productos;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const producto = await this.knex.from(this.table).select('*').where('id', id);
      if (producto.length <= 0) {
        return null;
      }
      return producto;
    } catch (error) {
      throw error;
    }
  }

  async save(obj) {
    try {
      const producto = await this.knex(this.table).insert({title: obj.title, price: obj.price, thumbnail: obj.thumbnail});
      return producto;
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      const producto = await this.knex(this.table).del('*');
      return producto;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const producto = await this.knex(this.table).where({id: id}).del();
      return producto;
    } catch (error) {
      throw error;
    }
  }

  async update(id, title, price, thumbnail) {
    try {
      const producto = await knex(this.table).where({id: id}).update({title: title, price: price, thumbnail: thumbnail})
      return producto;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Contenedor;
