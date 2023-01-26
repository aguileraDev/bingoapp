const { Schema, model } = require('mongoose');

/* Creación de un nuevo esquema para el modelo de usuario. */
const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname:{
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  registerDate: {
    type: Date,
    default: Date.now()
  },


});
/* Exportación del modelo para ser utilizado en otros archivos. */

module.exports = model('user', user);
