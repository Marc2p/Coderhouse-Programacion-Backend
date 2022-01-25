const knex = require("./knex-chat");

class Chat {
  constructor(knex, table) {
    this.knex = knex;
    this.table = table;
  }

  async getMessages() {
    try {
      const mensajes = await this.knex.from(this.table).select('*');
      return mensajes;
    } catch (error) {
      throw error;
    }
  }

  async saveMessages(obj) {
    try {
      const mensaje = await this.knex(this.table).insert({email: obj.email, message: obj.message, date: obj.date});
      return mensaje;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Chat;