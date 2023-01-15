module.exports = function mascotasHandler (mascotas){
    return {
        get: (data, callback) => { //Handler
          if (typeof data.indice !== "undefined") {
            // console.log("handler mascotas",{data})
            if (mascotas[data.indice]) {
              return callback(200, mascotas[data.indice])
            }
            return callback(404, { mensaje: `mascotas con indice ${data.indice} no encontrada`, })
          }
          callback(200, mascotas);
        },
        post: (data, callback) => { //Handler
          //console.log('handler',{data})
          mascotas.push(data.payload)
          callback(201, data.payload)
        },
        put: (data, callback) => { //Handler
          if (typeof data.indice !== "undefined") {
            // console.log("handler mascotas",{data})
            if (mascotas[data.indice]) {
              mascotas[data.indice] = data.payload;
              return callback(200, mascotas[data.indice])
            }
            return callback(404, { mensaje: `mascotas con indice ${data.indice} no encontrada`, })
          }
          callback(400, { mensaje: 'indice no enviado' });
        },
    
        delete: (data, callback) => { //Handler
          if (typeof data.indice !== "undefined") {
            // console.log("handler mascotas",{data})
            if (mascotas[data.indice]) {
              mascotas = mascotas.filter(
                (_mascota, indice) => indice != data.indice
              ); //guion al piso es para no utilizar esa variable, o usarla 
              return callback(204, {mensaje: `elemento con indice ${data.indice} eliminado`})
            }
            return callback(404, { mensaje: `mascotas con indice ${data.indice} no encontrada`, })
          }
          callback(400, { mensaje: 'indice no enviado' });
        },
    
      }
}

