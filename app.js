require('dotenv').config();
const express = require('express');
const { conexionDB } = require('./database/config');
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const findRouter = require('./router/find');
const authRouter = require('./router/auth');

/*Configuracion de Express y se especifican las rutas de la aplicación
*/
const app = express();
const port = process.env.port || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cors());

/* Conexión a la base de datos. */
conexionDB();

/* Rutas */
app.use('/api/1.0/auth', authRouter);
app.use('/api/1.0/findBy',findRouter)
app.get('/api/1.0', (req, res) => {
  res.send('bingo-users@v1.0.0 Api @aguileradev');
});

/** Se crea un servidor HTTP utilizando la función createServer() y se especifica el puerto en el que se va a escuchar.*/

const httpServer = createServer(app);
httpServer.listen(port, () => {
  console.log(`Listen port ${port}`);
});

/* Ahora se crea una instancia de un servidor de socket.io utilizando la clase Server y se especifica el servidor HTTP anterior como parámetro, para que socket.io utilice ese servidor para escuchar y manejar los eventos de comunicación en tiempo real. Además, habilita el cross-origin para que cualquier cliente pueda conectarse al servidor */

const io = new Server(httpServer, {
  cors: {
      origin: '*',
      methods: ["GET", "POST"]
  } 
});

let connectedUsers = [];
let gamingUsers = [];


io.on('connection', (socket) => {
  console.log(`Usuario en app ${socket.id}`);
  /* Escuchando el evento event:lobby event y luego está enviando los datos a la matriz de usuarios
  conectados. */
  socket.on('event:lobby', (data) => {
    
      let userIsLogin  = connectedUsers.find(user => user.id === data.id);
      
      if(!userIsLogin){
        connectedUsers.push(data);
      }else{
        console.log(`Usuario ${data.id} ya esta en la app`);
      }

      /* Emitiendo el evento `event:connected` a todos los clientes conectados. */
      io.emit('event:connected', connectedUsers);

    });

/* Al salir de la app el usuario es eliminado de los usuarios conectados */
  socket.on('event:logout', (data => {
 
    let index = connectedUsers.findIndex(user => user.id == data.id);
   

    if(index != -1){
      connectedUsers.splice(index,1);
   
    }
  }))

  /* Escuchando el evento `event:status` y luego está actualizando el estado del usuario.
     dependiendo si el usuario ha ganado o perdido el juego
  */
  socket.on('event:status', (data => {
 
    const user = connectedUsers.find(user => user.id == data.id);
    
    switch(data.status){
      case 'won' : {
        user.won = true;
        break;
      };
      case 'loser' : {
        user.loser = true;
        break;
      }
    }
  }))

   /* Este es un evento de socket que está escuchando el evento: evento de juego. Cuando se activa el
   evento, comprobará si el usuario ya está en la matriz gamingUsers. Si el usuario no está en la
   matriz, ingresa al usuario a la matriz. Si el usuario está en la matriz, establecerá las
   propiedades ganadas y perdedoras del usuario en falso. Luego emitirá el evento event:gameprogress
   a todos los clientes conectados. */
   socket.on('event:gaming', (data => {

    const user = gamingUsers.find(user => user.id == data.id)

    if(!user){
      gamingUsers.push(data);
    }else{
      user.won = false;
      user.loser = false;
    }

    io.emit('event:gameprogress',gamingUsers);
  }))
  
  /* Cuando un usuario deja de jugar independientemente de la razon, es eliminado de la matriz 
     gamingUsers indicando que ya no se encuentra dentro de un tablero de juego.
  */
  socket.on('event:offgaming', (data => {
    const index = gamingUsers.findIndex(user => user.id == data.id)

    if(index != -1){
      gamingUsers.splice(index,1);
    }
    /* Emitiendo el evento `event:gameprogress` a todos los clientes conectados. */
    io.emit('event:gameprogress', gamingUsers);
    
  }))

  /* Este es un evento de socket que está escuchando el evento: evento de botón. Cuando se activa el
  evento, emitirá el evento: evento de botón a todos los clientes conectados. De esta forma activa o
  desactiva el boton "jugar" y mostrando la cuenta regresiva para ingresar a otro juego */
  socket.on('event:button', (data => {
    io.emit('event:button', data);
  }))

  /* Escuchando el evento de desconexión. Cuando un cliente se desconecta, el servidor registrará la
  desconexión. */
  socket.on('disconnect', (data => {
    console.log(`usuario desconectado ${data}`);
  }))
    
})
