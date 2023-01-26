const { validationResult } = require('express-validator');

/**
 * función de middleware que se utiliza para validar los errores en una solicitud HTTP. La función 
 * recibe tres parámetros: req, res y next.
 * La función utiliza el método validationResult(req) del paquete express-validator para obtener los
 * errores de validación en la solicitud. Si hay errores, devuelve una respuesta HTTP con un código 
 * de estado 501 y un objeto JSON con los errores mapeados. Si no hay errores, llama a la siguiente 
 * función de middleware en la pila.
 * Asegura que los datos enviados en la solicitud cumplen con las reglas de validación antes de 
 * continuar con el procesamiento de la solicitud.
 * @param req - El objeto de la solicitud.
 * @param res - El objeto de respuesta.
 * @param next - La siguiente función de middleware en la pila.
 * @returns Se devuelve el objeto de errores.
 */
const validationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(501).json({
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = validationErrors;
