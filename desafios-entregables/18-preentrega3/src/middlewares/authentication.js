const admin = true;

const isAdmin = (req, res, next) => {
  if (!admin) {
    return res.status(403).json({error: 403, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
  } else {
    return next();
  }
}

module.exports = isAdmin;