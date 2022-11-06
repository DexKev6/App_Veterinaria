const listaVeterinarios = document.getElementById('lista-mascotas');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const identificacion = document.getElementById('identificacion');
const pais = document.getElementById('pais');
const indice = document.getElementById('indice');
//boton guardar
const btnGuardar = document.getElementById('btn-guardar');
//para evitar navegar al unidirle al input dentro de un formulario
const form = document.getElementById('form');

let mascotas = [
    {
        tipo: "Gato",
        nombre: "Manchas",
        dueno: "Esteban"
    },
    {
        tipo: "Perro",
        nombre: "Firulais",
        dueno: "Donchi"
    }
];

function listarMacotas() {
    const htmlMascotas = mascotas.map((mascota, index) =>
        `
            <tr>
                <th scope="row">${index}</th>
                <td>${mascota.tipo}</td>
                <td>${mascota.nombre}</td>
                <td>${mascota.dueno}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
                     <button type="button" class="btn btn-danger eliminar">Eliminar</button>
                    </div>
                </td>
            </tr>
        `).join("");
        listaVeterinarios.innerHTML = htmlMascotas;


        Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index))
        Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index))




}

//para evitar navegar al unidirle al input dentro de un formulario

function enviarDatos(evento){ //nomalmente se pone solo e
    evento.preventDefault();
    const datos = {
        tipo: pais.value,
        nombre: nombre.value,
        dueno: apellido.value
    };
    const accion = btnGuardar.innerHTML;
   switch(accion){
    case 'Editar':
        //editar
        mascotas[indice.value] = datos;
        break;
    default:
        //Crear
        mascotas.push(datos);
        break;   
   }
    
    listarMacotas();
    resetModal()
}

//Guardar el estado

function editar(index) {

    //el handles se llama al dar click y se puede poner el nombre que queramos cambiar el handler por lo que sea
    return function handler(){
        
        btnGuardar.innerHTML = 'Editar' 
        //$('#exampleModal').modal('toggle'); //funcionquery de bootstrap
       const mascota = mascotas[index];
       indice.value = index;
       pais.value = mascota.tipo;
       nombre.value = mascota.nombre;
       apellido.value = mascota.dueno;
        
    }
    
}

function resetModal(){
    
    indice.value = ''
    pais.value = '';
    nombre.value = '';
    apellido.value = '';
    btnGuardar.innerHTML = 'Crear'
}

function eliminar(index){
    return function clickElminiar(){
        // una fora de eliminar  delete mascotas[index];

        mascotas = mascotas.filter((mascota, indiceMascota) => indiceMascota !== index);
        listarMacotas()
    }    

}

listarMacotas(); 

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;