const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const enrutador = require("./enrutador");


module.exports = (req, res) => {
    //req = request == solicitus
    //res = respuesta
  
    //1. Obtener url desde el objeto request  //OK
  
    const urlActua = req.url;
    const urlParseada = url.parse(urlActua, true);
    //console.log({urlActua, urlParseada});//forma de ahoorarse un console log
  
  
    //2. Obtener la ruta
    const ruta = urlParseada.pathname;
  
    //3. Quitar slash "/" a la ruta
  
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '') //expresion regular para quitar la r u t a
  
    //3.1 Obtener el metodo http
  
    const metodo = req.method.toLowerCase();
  
    //3.2 Obtener variables del quety url
  
    const { query = {} } = urlParseada //query igual a objeto vacio pra no tirar error (desestruturizacion)
  
    //3.3 Obtener headers
  
    const { headers = {} } = req
  
    //3.4 Obtener payload, en caso de haber uno
  
    const decoder = new StringDecoder('utf-8'); //Fuente de informacion por pedazos
    //utf-8 es idioma humano
    let buffer = '';
  
    //3.4.1 Ir acumulando la data cuando el request  reciba un payload
    req.on('data', (data) => {
      buffer += decoder.write(data);
    });
  
    //3.4.2 Terminar de acumular datos y decirle al decoder que finalice
    req.on('end', () => {  //Poner cuidado dentro del parentecis no va nada
      buffer += decoder.end();
  
      if (headers["content-type"] === 'application/json') {
        buffer = JSON.parse(buffer)
      }
  
      //3.4.3 Revisar si tiene subrutas. en este caso es el indice del array
  
      if (rutaLimpia.indexOf("/") >= -1) { //indexOf puede ser de los arrays y los string
        //separar rutas
        var [rutaPrincipal, indice] = rutaLimpia.split('/')
      }
  
  
  
      //3.5 Ordenar la data del request
  
      const data = {
        indice,
        ruta: rutaPrincipal || rutaLimpia,
        query,
        metodo,
        headers,
        payload: buffer,
      };
  
  
  
      //3.6 elegir el manejador dependiendo de la ruta y asignarle la funcion que el enrutador tiene //handler
      let handler;
     
    if (
      data.ruta &&  //tambien puede cambiar ruta principal por data.ruta
        enrutador[data.ruta] &&
        enrutador[data.ruta][metodo]
      ) {//No poner un igualador o comparador es preguntar si existe
        handler = enrutador[data.ruta][metodo]; //para poner dentro del hadler una funcion
      } else {
        handler = enrutador.noEncontrado;
      }
  
  
      //4. Ejecutar handler (manejador) para enviar respuesta 
      if (typeof handler === 'function') {
        handler(data, (statusCode = 200, mensaje) => {
          const respuesta = JSON.stringify(mensaje);
          res.setHeader("Content-Type", "application/json")
          res.writeHead(statusCode); //res es objeto de respuesta
  
          //Linea donde realmente ya estamos respondiendo a la aplicacion
  
          res.end(respuesta);
        })
      }
  
      //repuestas segun la ruta
    });
 
  }