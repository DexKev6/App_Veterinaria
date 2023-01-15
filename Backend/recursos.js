module.exports = {
    mascotas: [
      { tipo: "perro", nombre: "Trosky", dueno: "Camilo" },
      { tipo: "Gato", nombre: "felx", dueno: "Camilo" },
      { tipo: "loro", nombre: "rebeca", dueno: "Camilo" }
    ],

    veterinarias: [
      {nombre: "Alexandra", apellido: "Perez", documento: "12345689"},
      {nombre: "Alex", apellido: "Gomez", documento: "178545689"},
      {nombre: "Julian", apellido: "Donche", documento: "46845689"},
    ],

  duenos : [
    {nombre: "Alexandra1", apellido: "Pere2z", documento: "12345689"},
    {nombre: "Alex1", apellido: "Gomez", documento: "178545689"},
    {nombre: "Julian1", apellido: "Donche2", documento: "46845689"},
  ],

  consultas: [
    {
      mascota: 0,
      veterinaria: 0,
      fechaCreacion: new Date(),
      fechaEdicion: new Date(),
      historia: '',
      diagnostico: ''
    },
  ],

  }