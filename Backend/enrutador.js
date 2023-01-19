const recursos = require('./recursos'); //el punto significa carpecta actual
const mascotas = require('./Rutas/mascotas')
const veterinarias = require('./Rutas/veterinarias')
const duenos = require('./Rutas/duenos')
const consultas = require('./Rutas/consultas')


module.exports = {
  ruta: (data, callback) => { //Handler
    callback(200, { mensaje: 'esta es ruta' })
  },
 mascotas: mascotas(recursos.mascotas),
 veterinarias: veterinarias(recursos.veterinarias),
 duenos: duenos(recursos.duenos),
 consultas: consultas(recursos),
  noEncontrado: (data, callback) => {
    callback(404, { mensaje: 'no encontrado' })
  }
};
