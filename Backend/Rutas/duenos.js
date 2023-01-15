module.exports = function duenosHandler (duenos){
    return {
        get: (data, callback) => { //Handler
          if (typeof data.indice !== "undefined") {
            // console.log("handler duenos",{data})
            if (duenos[data.indice]) {
              return callback(200, duenos[data.indice])
            }
            return callback(404, { mensaje: `dueño con indice ${data.indice} no encontrada`, })
          }
          callback(200, duenos);
        },
        post: (data, callback) => { //Handler
          //console.log('handler',{data})
          duenos.push(data.payload)
          callback(201, data.payload)
        },
        put: (data, callback) => { //Handler
          if (typeof data.indice !== "undefined") {
            // console.log("handler duenos",{data})
            if (duenos[data.indice]) {
              duenos[data.indice] = data.payload;
              return callback(200, duenos[data.indice])
            }
            return callback(404, { mensaje: `dueño con indice ${data.indice} no encontrada`, })
          }
          callback(400, { mensaje: 'indice no enviado' });
        },
    
        delete: (data, callback) => { //Handler
          if (typeof data.indice !== "undefined") {
            // console.log("handler duenos",{data})
            if (duenos[data.indice]) {
              duenos = duenos.filter(
                (_duenos, indice) => indice != data.indice
              ); //guion al piso es para no utilizar esa variable, o usarla 
              return callback(204, {mensaje: `elemento con indice ${data.indice} eliminado`})
            }
            return callback(404, { mensaje: `dueño con indice ${data.indice} no encontrada`, })
          }
          callback(400, { mensaje: 'indice no enviado' });
        },
    
      }
}

