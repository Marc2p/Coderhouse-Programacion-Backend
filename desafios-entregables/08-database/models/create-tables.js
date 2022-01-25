const knexProductos = require('./knex-productos');
const knexChat = require('./knex-chat');

knexProductos.schema.hasTable('productos').then(exists => {
  if (!exists) {
    return knex.schema.createTable('productos', table => {
      table.increments('id')
      table.string('title')
      table.float('price')
      table.string('thumbnail')
    })
  }
  else {
    console.log('La tabla productos ya existe');
  }
})

knexChat.schema.hasTable('mensajes').then(exists => {
  if (!exists) {
    return knexChat.schema.createTable('mensajes', table => {
      table.increments('id')
      table.string('email')
      table.string('message')
      table.date('date')
    })
  }
  else {
    console.log('La tabla mensajes ya existe');
  }
})