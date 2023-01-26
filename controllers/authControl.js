const user = require("../database/models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require('dotenv').config();

/**
 * Primero, utiliza el métodovalidationResult(req) para verificar si hay errores en la solicitud. Si 
 * hay errores, devuelve una respuesta con un código de estado HTTP 501 y un objeto JSON con los 
 * errores y un valor de datos nulo. Si no hay errores, obtiene los datos del usuario (nombre, 
 * apellido, correo electrónico y contraseña) del cuerpo de la solicitud. Luego, busca el usuario en 
 * la base de datos utilizando el correo electrónico proporcionado. Si el usuario ya existe, devuelve 
 * una respuesta con un código de estado HTTP 500 y un mensaje de "Usuario ya existe". Si el usuario 
 * no existe, crea un nuevo usuario con los datos proporcionados, cifra la contraseña y guarda el 
 * nuevo usuario en la base de datos. Finalmente, genera un token de autenticación utilizando el 
 * paquete "jsonwebtoken" (jwt) y devuelve una respuesta con un código de estado HTTP 200 y un objeto 
 * JSON con los datos del usuario y el token generado. Si ocurre un error,devuelve una respuesta con 
 * un código de estado HTTP 400.
 * @param req - El objeto de la solicitud.
 * @param res - El objeto de respuesta.
 * @returns El usuario está siendo devuelto.
 */
const registerUser = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(501).json({
      errors: errors.mapped(),
      data: null,
    });
  }

  const { name,lastname,email, password } = req.body;

  /* Buscando un usuario con el correo electrónico proporcionado en el cuerpo de la solicitud. */
  let userData = await user.findOne({ email });

 /* Verificar si el usuario ya existe. */
  try {
    if (userData) {
      return res.status(500).json({
        error: true,
        message: "Usuario ya existe",
        data: null,
      });
    }
  /* Crear un nuevo usuario con el correo electrónico, nombre y contraseña proporcionados en el cuerpo
  de la solicitud. */
    const newUser = new user({ name,lastname, email, password });
  
  /* Cifrado de la contraseña. */
    const salt = bcryptjs.genSaltSync(12);
    newUser.password = bcryptjs.hashSync(password, salt);

 /* Guardando el nuevo usuario en la base de datos. */
    await newUser.save();

 /* Creación de un objeto de carga útil con la identificación del usuario. */
    const payload = {
      id: newUser._id,
    };
   
   /* Generación de un token. */
    jwt.sign(
      payload,
      process.env.secret,
      { expiresIn: process.env.token_expiration },
      (error, token) => {
        res.json({
          error: false,
          message: 'Usuario creado correctamente',
          data: newUser,
          token,
        });
      }
    );
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Usuario no puede ser creado",
      data: null,
    });
  }
};

/**
 * Utiliza el método validationResult(req) para verificar si hay errores en la solicitud. Si hay 
 * errores, devuelve una respuesta con un código de estado HTTP 501 y un objeto JSON con los errores. 
 * Si no hay errores, obtiene los datos del usuario (correo electrónico y contraseña) del cuerpo de 
 * la solicitud. Luego, busca el usuario en la base de datos utilizando el correo electrónico 
 * proporcionado. Si el usuario no existe, devuelve una respuesta con un código de estado HTTP 401 y 
 * un mensaje de "user o password invalidos". Si el usuario existe, compara la contraseña ingresada 
 * con la contraseña almacenada en la base de datos utilizando el paquete "bcryptjs" y si son 
 * diferentes, devuelve una respuesta con un código de estado HTTP 401 y un mensaje de "user o 
 * password invalidos". Si las contraseñas son iguales, genera un token de autenticación jwt
 * @param req - El objeto de la solicitud.
 * @param res - El objeto de respuesta.
 * 
 * 
 */
const userLogin = async (req, res) => {
  
   const errors = validationResult(req);

 /* Valida que el cuerpo de la solicitud no contenga errores */
   if (!errors.isEmpty()) {
     return res.status(501).json({
       errors: errors.mapped(),
     });
   }

   
   try {
     /* Comprobando que el usuario existe. */
     const { email, password } = req.body;
     let userData = await user.findOne({ email });
     if (!userData) {
       return res.status(401).json({
         message: 'user o password invalidos',
       });
     }
       
       /* Comparar la contraseña que ingresó el usuario con la contraseña que está almacenada en la
       base de datos. */
       const validatePassword = bcryptjs.compareSync(password, userData.password);
  
       if (!validatePassword) {
         return res.status(401).json({
           message: 'user o password invalidos',
         });
       }
       const payload = {
         id: userData._id,
       };
       
     const { _id, name, lastname } = userData;
     const data = {
       id: _id,
       name,
       lastname,
     };
       /* Generación de un token. */
       jwt.sign(
         payload,
         process.env.secret,
         { expiresIn: process.env.token_expiration },
         (error, token) => {
           if (error) {
             return res.json({
               error: true,
               event: error,
               message: 'Ha ocurrido un error',
             });
           } else {
             return res.json({
               error: false,
               message: 'Sesion iniciada',
               data: data,
               token
               
             });
           }
         }
        );
     } catch (error) {
       return res.status(400).json({
         error: true,
         message: 'Error al logearse',
       });
     }
     
};

module.exports = {
  userLogin,
  registerUser,
};
