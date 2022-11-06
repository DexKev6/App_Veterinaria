const listaVeterinarios = document.getElementById('lista-veterinarios');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const identificacion = document.getElementById('identificacion');
const pais = document.getElementById('pais');
const indice = document.getElementById('indice');
//boton guardar
const btnGuardar = document.getElementById('btn-guardar');
//para evitar navegar al unidirle al input dentro de un formulario
const form = document.getElementById('form');

let veterinarios = [
    {
        nombre: "Kevin",
        apellido: "Saldarrriaga",
        identificacion: "1003302325",
        pais: "Colombia"
    },
    {
        nombre: "Naryvie",
        apellido: "vasquez",
        identificacion: "1023156151",
        pais: "Colombia"
    }
];

function listarVeterinarios() {
    const htmlVeterinarios = veterinarios.map((veterinario, index) =>
        `
            <tr>
                <th scope="row">${index}</th>
                <td>${veterinario.nombre}</td>
                <td>${veterinario.apellido}</td>
                <td>${veterinario.identificacion}</td>
                <td>${veterinario.pais}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
                     <button type="button" class="btn btn-danger eliminar">Eliminar</button>
                    </div>
                </td>
            </tr>
        `).join("");
        listaVeterinarios.innerHTML = htmlVeterinarios;


        Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index))
        Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index))




}

//para evitar navegar al unidirle al input dentro de un formulario

function enviarDatos(evento){ //nomalmente se pone solo e
    evento.preventDefault();
    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        identificacion: identificacion.value,
        pais: pais.value,
    };
    const accion = btnGuardar.innerHTML;
   switch(accion){
    case 'Editar':
        //editar
        veterinarios[indice.value] = datos;
        break;
    default:
        //Crear
        veterinarios.push(datos);
        break;   
   }
    
    listarVeterinarios();
    resetModal()
}

//Guardar el estado

function editar(index) {

    //el handles se llama al dar click y se puede poner el nombre que queramos cambiar el handler por lo que sea
    return function handler(){
        
        btnGuardar.innerHTML = 'Editar' 
        //$('#exampleModal').modal('toggle'); //funcionquery de bootstrap
       const veterinario = veterinarios[index];
       indice.value = index;
       nombre.value = veterinario.nombre;
       apellido.value = veterinario.apellido;
       identificacion.value = veterinario.identificacion;
       pais.value = veterinario.pais;
        
    }
    
}

function resetModal(){
    
    indice.value = ''
    nombre.value = '';
    apellido.value = '';
    identificacion.value = '';
    pais.value = '';
    btnGuardar.innerHTML = 'Crear'
}

function eliminar(index){
    return function clickElminiar(){
        // una fora de eliminar  delete mascotas[index];

        veterinarios = veterinarios.filter((veterinario, indiceVeterinario) => indiceVeterinario !== index);
        listarVeterinarios()
    }    

}

listarVeterinarios(); 

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;