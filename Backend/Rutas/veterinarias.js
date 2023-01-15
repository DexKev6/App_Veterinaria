module.exports = function veterinariasHandler (veterinarias){
    return {
        get: (data, callback) => { //Handler
          if (typeof data.indice !== "undefined") {
            // console.log("handler veterinarias",{data})
            if (veterinarias[data.indice]) {
              return callback(200, veterinarias[data.indice])
            }
            return callback(404, { mensaje: `veterinarias con indice ${data.indice} no encontrada`, })
          }
          callback(200, veterinarias);
        },
        post: (data, callback) => { //Handler
          //console.log('handler',{data})
          veterinarias.push(data.payload)
          callback(201, data.payload)
        },
        put: (data, callback) => { //Handler
          if (typeof data.indice !== "undefined") {
            // console.log("handler veterinarias",{data})
            if (veterinarias[data.indice]) {
              veterinarias[data.indice] = data.payload;
              return callback(200, veterinarias[data.indice])
            }
            return callback(404, { mensaje: `veterinarias con indice ${data.indice} no encontrada`, })
          }
          callback(400, { mensaje: 'indice no enviado' });
        },
    
        delete: (data, callback) => { //Handler
          if (typeof data.indice !== "undefined") {
            // console.log("handler veterinarias",{data})
            if (veterinarias[data.indice]) {
              veterinarias = veterinarias.filter(
                (_veterinarias, indice) => indice != data.indice
              ); //guion al piso es para no utilizar esa variable, o usarla 
              return callback(204, {mensaje: `elemento con indice ${data.indice} eliminado`})
            }
            return callback(404, { mensaje: `veterinarias con indice ${data.indice} no encontrada`, })
          }
          callback(400, { mensaje: 'indice no enviado' });
        },
    
      }
}

