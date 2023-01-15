const listaMacotas = document.getElementById('lista-mascotas');
const tipo = document.getElementById('tipo');
const nombre = document.getElementById('nombre');
const dueno = document.getElementById('dueno');
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
    solicitarMascotas();
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
        listaMacotas.innerHTML = htmlMascotas;


        Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index))
        Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index))




}

//para evitar navegar al unidirle al input dentro de un formulario

function enviarDatos(evento){ //nomalmente se pone solo e
    evento.preventDefault();
    const datos = {
        tipo: tipo.value,
        nombre: nombre.value,
        dueno: dueno.value
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
       tipo.value = mascota.tipo;
       nombre.value = mascota.nombre;
       dueno.value = mascota.dueno;
        
    }
    
}

function resetModal(){
    
    indice.value = ''
    tipo.value = '';
    nombre.value = '';
    dueno.value = '';
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

function solicitarMascotas(){
    fetch('http://localhost:8000/mascotas').then((respuesta)=> {
    if(respuesta.ok){
        return respuesta.json();
    }
    }).then(mascotasDelServer => {
        console.log({mascotasDelServer})
    });
}

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;