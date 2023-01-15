module.exports = function consultasHandler(consultas) {
  return {
    get: (data, callback) => { //Handler
      if (typeof data.indice !== "undefined") {
        // console.log("handler consultas",{data})
        if (consultas[data.indice]) {
          return callback(200, consultas[data.indice])
        }
        return callback(404, { mensaje: `consulta con indice ${data.indice} no encontrada`, })
      }
      callback(200, consultas);
    },
    post: (data, callback) => { //Handler
      let nuevaConsulta = data.payload;
      nuevaConsulta.fechaCreacion = new Date();
      nuevaConsulta.fechaEdicion = null;
      consultas = [...consultas, nuevaConsulta]
      callback(201, data.payload)
    },
    put: (data, callback) => { //Handler
      if (typeof data.indice !== "undefined") {
        // console.log("handler consultas",{data})
        if (consultas[data.indice]) {

          const { fechaCreacion } = consultas[data.indice]

          consultas[data.indice] = {
            ...data.payload,
            fechaCreacion,
            fechaEdicion: new Date()
          };
          return callback(200, consultas[data.indice])
        }
        return callback(404, { mensaje: `consulta con indice ${data.indice} no encontrada`, })
      }
      callback(400, { mensaje: 'indice no enviado' });
    },

    delete: (data, callback) => { //Handler
      if (typeof data.indice !== "undefined") {
        // console.log("handler consultas",{data})
        if (consultas[data.indice]) {
          consultas = consultas.filter(
            (_consultas, indice) => indice != data.indice
          ); //guion al piso es para no utilizar esa variable, o usarla 
          return callback(204, { mensaje: `elemento con indice ${data.indice} eliminado` })
        }
        return callback(404, { mensaje: `consulta con indice ${data.indice} no encontrada`, })
      }
      callback(400, { mensaje: 'indice no enviado' });
    },

  }
}

