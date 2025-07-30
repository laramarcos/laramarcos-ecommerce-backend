const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function auth(req, res, next) {
  // Obtener el token del header Authorization
  const token = req.headers.authorization;

  // Si no hay token, retornamos un error 401
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  // Acá vamos a chequear la validez del token
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).send({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
}


module.exports = auth;
