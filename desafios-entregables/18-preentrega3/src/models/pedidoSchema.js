const mongoose = require('mongoose');

const pedidoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  timestamp: {
    type: Date,
    default: Date.now
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  productos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Productos'
    }
  ]
});

const PedidoModel = mongoose.model('Pedidos', pedidoSchema);

module.exports = PedidoModel;