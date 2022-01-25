const knex = require('knex')({
  client: 'better-sqlite3',
  connection: {
    filename: './models/DB/ecomerce.sqlite'
  }
})
module.exports = knex