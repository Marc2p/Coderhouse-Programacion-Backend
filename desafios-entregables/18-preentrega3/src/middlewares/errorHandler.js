const errorHandler = (error, req, res, next) => {
  console.log(error);
  return res.status(400).json({"error": 400, "descripcion": error.message});
}

module.exports = errorHandler;