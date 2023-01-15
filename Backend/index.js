//Dependencias importante arriba
const http = require('http');
const requestHandler = require('./request-handler');
//const recursos = require('./recursos'); //quitados para mejorar

//global.recursos = recursos; //uitados para mejorar


const server = http.createServer(requestHandler);

server.listen(8000, () => {
  console.log('el servidor esta escuchando peticiones en http://localhost:8000/ ')
});   //lo que hay dentro de parentecis es el puerto  (lo del principio)
