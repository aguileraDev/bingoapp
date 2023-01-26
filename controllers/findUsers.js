const user = require("../database/models/user");
const { validationResult } = require("express-validator");

/**
 *  busca un usuario por su correo electrónico. Primero, utiliza el método validationResult(req) 
 *  para verificar si hay errores en la solicitud. Si hay errores, devuelve una respuesta con un 
 *  código de estado HTTP 500 y un mensaje de "Bad request". Si no hay errores, obtiene el correo 
 *  electrónico del parámetro de la solicitud y busca el usuario en la base de datos. Si el usuario 
 *  no se encuentra, devuelve una respuesta con un código de estado HTTP 404 y un mensaje de "user 
 *  not found". Si se encuentra el usuario, devuelve una respuesta con un código de estado HTTP 200 y 
 *  un mensaje de "user found", junto con los datos del usuario. En caso de un error, devuelve una 
 *  respuesta con un código de estado HTTP 400 y un mensaje de "Query failed".
 * @param req - El objeto de la solicitud.
 * @param res - el objeto de respuesta
 */

const findUserByEmail = async (req, res) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(500).json({
            error: true,
            message: 'Bad request',
            data: null
        })
    }
    const {email} = req.params;

    try {
        const userData = await user.findOne({email});
        if(!userData){
            return res.status(404).json({
                error: false,
                message: 'user not found',
                data: null
            })
        }
        const {_id,name,lastname,registerDate, winner} = userData;

        return res.status(200).json({
            error: false,
            message: 'user found',
            data: {
                _id,
                name,
                lastname,
                registerDate,
                winner
            },
        })
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: 'Query failed',
            data: null
        });
    }
};

/**
 *  busca un usuario por su ID. Utiliza el mismo proceso de validación de errores que la función 
 *  findUserByEmail. Si no hay errores, obtiene el ID del parámetro de la solicitud y busca el 
 *  usuario en la base de datos. Si el usuario no se encuentra, devuelve una respuesta con un código 
 *  de estado HTTP 404 y un mensaje de "user not found". Si se encuentra el usuario, devuelve una 
 *  respuesta con un código de estado HTTP 200 y un mensaje de "user found", junto con los datos del 
 *  usuario. En caso de un error, devuelve una respuesta con un código de estado HTTP 400 y un 
 *  mensaje de "Query failed".
 * @param req - El objeto de la solicitud.
 * @param res - El objeto de respuesta.
 */
const findUserById = async (req, res) => {
   
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(500).json({
            error: true,
            message: 'Bad request',
            data: null
        })
    }
    const {id} = req.params;

    try {
        const userData = await user.findById(id);
   
        if(!userData){
            return res.status(404).json({
                error: false,
                message: 'user not found',
                data: null
            })
        }

        const {name,lastname,email, registerDate, winner} = userData;

        return res.status(200).json({
            error: false,
            message: 'user found',
            data: {
                name,
                lastname,
                email,
                registerDate,
                winner
            },
        })
    } catch (error) {

        return res.status(400).json({
            error: true,
            message: 'Query failed',
            data: null
        })
        
    }
}

module.exports = {
    findUserByEmail,
    findUserById
};