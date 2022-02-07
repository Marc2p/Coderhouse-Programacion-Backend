const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const cartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  timestamp: {
    type: Date,
    default: Date.now
  },
  productos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Productos'
    }
  ]
});

const Productos = mongoose.model('Productos', productSchema);
const Carritos = mongoose.model('Carritos', cartSchema);

module.exports = {Productos, Carritos};