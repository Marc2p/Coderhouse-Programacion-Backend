const dotenv = require('dotenv').config()
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'admin',
    password: 'Marcosgunner231',
    database: 'ecomerce'
  }
})
module.exports = knex