const jwt = require('jsonwebtoken');


/**
 * Comprueba si el token es válido y, si lo es, agrega el ID de usuario al objeto de solicitud.
 * @param req - El objeto de la solicitud.
 * @param res - El objeto de respuesta.
 * @param next - La siguiente función de middleware en la pila.
 * @returns Se devuelve la función verificarToken.
 */
const verifyToken = (req, res, next) => {
  /* Obtener el token del encabezado. */
  const token = req.header('x-auth-token');

/* Esta es una verificación simple para ver si el token es válido. Si no es válido, devolverá un
mensaje de error. */
  if (!token) {
    return res.status(401).json({
      error: true,
      message: 'token invalido',
      data: null,
    });
  }

  try {
 /* Verificando el token y agregando la identificación de usuario al objeto de solicitud. */
    const payload = jwt.verify(token, process.env.secret);
    req.userid = payload.id;

    next();
  } catch (err) {
    return res.status(401).json({
      error: true,
      message: 'token invalido',
      data: null,
    });
  }
};

module.exports = verifyToken;
