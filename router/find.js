const { Router } = require('express');
const findControl = require('../controllers/findUsers');
const { check } = require('express-validator');

const findRouter = new Router();
/* Una ruta que se utiliza para encontrar un usuario por correo electrónico. */

findRouter.get('/email/:email',
    [
        check('email', 'invalid format').trim().isEmail().notEmpty()
    ],
    findControl.findUserByEmail
);

/* Una ruta que se utiliza para encontrar un usuario por id. */
findRouter.get('/id/:id',
    [
        check('id', 'Only string and not empty').trim().notEmpty()
    ],
    findControl.findUserById
);

module.exports = findRouter;