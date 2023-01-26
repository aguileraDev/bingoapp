const { Router } = require('express');
const authControl = require('../controllers/authControl');
const { check } = require('express-validator');
const authRouter = new Router();



/* Esta es una ruta que se usará para probar si el authRouter está funcionando. */
authRouter.get('/', (req, res) => {
  res.send('utilizando authRouter en localhost:3000/auth');
});

/* Una solicitud posterior a la ruta/registro. Está utilizando express-validator para verificar si el
correo electrónico es un correo electrónico, si la contraseña tiene al menos 8 caracteres y si el
nombre no está vacío. Luego está llamando a la función registerUser en el archivo authControl. */

authRouter.post(
  '/register',
  [
    check('email', 'formato invalido').isEmail(),
    check('password', 'La contraseña requiere al menos 8 caracteres').isLength({
      min: 8,
      max: 16,
    }),
    check('name', 'nombre de usuario es requerido').not().isEmpty(),
  ],
  authControl.registerUser
);

/* Comprobando si el correo electrónico es un correo electrónico valido, si la contraseña tiene al menos 8 caracteres y si el nombre no está vacío. Luego está llamando a la función registerUser en el archivo authControl. */

authRouter.post(
  '/login',
  [
    check('email', 'formato invalido').isEmail(),
    check('password', 'La contraseña requiere al menos 8 caracteres').isLength({
      min: 8,
      max: 16,
    }),
  ],
  authControl.userLogin
);

module.exports = authRouter;
