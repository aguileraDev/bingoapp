# BingoApp

BingoApp es un proyecto que simula el juego tradicional de bingo. Los jugadores pueden registrarse con un usuario  y contraseña, la interfaz esta diseñada de forma amigable y busca obtener el mayor rendimiento para ofrecer la mejor experiencia de juego, desarrollada con **Angular 15** | **Java Spring Boot 3** | **Node.Js** | **MongoDB** | **MySQL 8**

[![bingo-login.jpg](https://i.postimg.cc/xdfZCbCS/bingo-login.jpg)](https://postimg.cc/HrNzvnXS)

# Índice

- [Comenzando](#comenzando-)
- [Requerimientos](#requerimientos-)
- [Despliegue](#despliegue-)
- [Desarrollo](#desarrollo-)
- [Demo](#demo-)
- [Agradecimientos](#agradecimientos-)


## Como Jugar
El juego consiste en que cada jugador obtiene un carton de 25 espacios generado de forma aleatoria con números del 1 al 75 en cada ronda se realiza un sorteo si la ficha resultante se encuentra en tu carton debes marcarlo. 
[![bingo-main.jpg](https://i.postimg.cc/SQCfBxSL/bingo-main.jpg)](https://postimg.cc/rzy4Wctz)
Existen varias formas de ganar
* Linea horizontal
* Linea vertical
* Diagonal
* 4 esquinas
* Carton lleno

[![bingo-ways-To-Win.png](https://i.postimg.cc/jS7Vc2Qb/bingo-ways-To-Win.png)](https://postimg.cc/9DCNFWn8)

Una vez completado algunos de los patrones debes pulsar el boton "BINGO"

[![bingo-cardboard.jpg](https://i.postimg.cc/W1NkFst6/bingo-cardboard.jpg)](https://postimg.cc/bs5J4cxs)

### Requerimientos 📋

+ Node.Js versión 16 o superior
+ Angular CLI 15 o superior
+ Npm versión 8 o superior
+ MongoDB version 5 o superior
+ MySQL version 8
+ Java JDK version 17 o superior
+ Spring Boot version 3
+ Navegador web compatible (recomendamos la ultima version de Google Chrome)


## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Bases de datos
- Asegurate de tener [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/) instalado y el servicio ejecutandose en tu entorno local, descarga el [script de la base de datos en MySQL](https://drive.google.com/file/d/1FBS1MJyzs1i77Su4OpEVKETUaEyaux9y/view?usp=share_link)

- Ejecuta el script en tu entorno de trabajo de MySQL preferido en mi caso he usado [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

[![script-sql.jpg](https://i.postimg.cc/DZpGkRWX/script-sql.jpg)](https://postimg.cc/KkLjtqDG)

- Descarga el codigo de las ramas front-end, backend-node y backend-java o clona el repositorio.

[![download-project.jpg](https://i.postimg.cc/SstJn8f2/download-project.jpg)](https://postimg.cc/wyL6P1Pg)

- Una vez extraidos los archivos puedes renombrar las carpetas para mayor comodidad

### Back-end
Ahora es momento de configurar los servicios de backend, para Java abre la carpeta anteriormente descargada en tu entorno de desarrollo ve al application. properties,  asegurate de tener el puerto 9090 libre sino puedes cambiarlo.

### Java
#### Configuración de puerto y  base de datos en local
- **server.port = 9090**

- spring.datasource.url = **jdbc:mysql://localhost:3306/bingo?useSSL=false&serverTimezone=UTC-5&allowPublicKeyRetrival=true**
- spring.datasource.username = **nombre de usuario**
- spring.datasource.password = **contraseña**

- Reemplaza el **nombre de usuario** y **contraseña** por las de tu entorno local de MySQL

### Ejecuta el servidor
[![spring.jpg](https://i.postimg.cc/3NLmHB1d/spring.jpg)](https://postimg.cc/RJHN7wjB)

### Documentación de la API
- En tu navegador web abre la URL: **http://localhost:9090/api/v1/swagger-ui/index.html**

[![swagger.jpg](https://i.postimg.cc/C5HYZPXx/swagger.jpg)](https://postimg.cc/YL9TZ3t5)
### Node.js
#### Instala las dependencias
- Abre una ventana de comandos en el directorio de Node.js anteriormente guardado y ejecuta el comando *npm install*
[![npm-install.jpg](https://i.postimg.cc/0yFJ8rs2/npm-install.jpg)](https://postimg.cc/68VQcWqD)
#### Configura el archivo .ENV
- Dentro del directorio del servidor crea un nuevo archivo **.ENV** y agrega las siguientes variables de entorno
- PORT=9091
- secret=kj$as/LQ!
- token_expiration= 3h
- db_host=mongodb://127.0.0.1:27017/bingo 

[![bingo-mongo-config.jpg](https://i.postimg.cc/XvWxV23v/bingo-mongo-config.jpg)](https://postimg.cc/ZWf6HxWk)

#### Ejecuta el servidor
- Tienes dos comandos **npm run dev** para entornos de desarrollo con nodemon ó **npm run start** para una ejecucion normal. Si todo ha salido bien debes ver algo como esto

[![node-execute.jpg](https://i.postimg.cc/Y0VKV550/node-execute.jpg)](https://postimg.cc/2L4KLK8N)

### Front-end
#### Instala las dependencias
- Abre una ventana de comandos en el directorio de la rama front-end anteriormente guardado y ejecuta el comando *npm install*
#### Ejecuta el servidor
- Una vez instaladas las dependencias ejecuta el comando **ng serve**
- Abre la siguiente URL en tu navegador web **http://localhost:4200**

[![bingo-ng-serve.jpg](https://i.postimg.cc/CLLN5vRP/bingo-ng-serve.jpg)](https://postimg.cc/9zKTNYtZ)

#### Visualiza la ventana de login

[![bingo-login.jpg](https://i.postimg.cc/xdfZCbCS/bingo-login.jpg)](https://postimg.cc/HrNzvnXS)

## Despliegue 📦
### Enlace

https://bingoapp-hosting.web.app/

### Front-end
Para el despliegue del front-end he utilizado [Firebase](https://firebase.google.com/?hl=es)
### Back-end
-  Para los servicios de back-end  he desplegado usando los servicios de [Render](https://render.com/) para la Api con Spring Boot he implementado un contenedor de Docker.

## Demo

https://youtu.be/f1lyFf7qK-U

## Desarrollo 🛠️

- Lenguaje de programación: Java, Typescript, Javascript
- Front-end:
   - Angular 15
- Back-end: 
   - Spring Boot 3 + Docker
   - Node.js
- Librerías: 
    - RxJs
    - Bootstrap 5
    - ngx-cookie-service
    - ngx-socket-io
    - Unicons
    - Express
    - Swagger (OpenApi 3)
- Base de datos: 
    - MySQL 8 (Logica del negocio)
    - MongoDB (Control de usuarios)
- Control de versiones: Git
- Servicio de alojamiento: GitHub
- Herramienta de desarrollo: 
     + Visual Studio Code
     + Intellij Idea Community Edition

## Agradecimientos 🎁

- A todo el equipo de trabajo de Sofka University por su ardua labor especialmente a los profesores **Adryan Infante** y **Julian Lasso**. 
- A todos los compañeros de Sofka University en discord, son personas maravillosas. 


---
⌨️ con ❤️ por [aguileradev](https://github.com/aguileraDev) 😊
