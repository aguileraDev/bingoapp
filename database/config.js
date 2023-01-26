const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

/**
 * Esta función se conecta a la base de datos y devuelve una promesa que se resuelve en el objeto de
 * conexión.
 */
const conexionDB = async () => {

  try {
    await mongoose.connect(process.env.db_host);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`Database error ${error}`);
  }
};

module.exports = {
  conexionDB,
};
