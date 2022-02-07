const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.MONGODB_URL+'?authSource=admin&w=1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('[Mongoose] - connected in:', process.env.MONGODB_URL);
});

mongoose.connection.on('error', (err) => {
  console.log('[Mongoose] - error:', err);
});

module.exports = connection;