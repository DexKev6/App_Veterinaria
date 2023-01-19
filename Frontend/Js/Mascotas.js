const listaMacotas = document.getElementById('lista-mascotas');
const tipo = document.getElementById('tipo');
const nombre = document.getElementById('nombre');
const dueno = document.getElementById('dueno');
const indice = document.getElementById('indice');
//boton guardar
const btnGuardar = document.getElementById('btn-guardar');
//para evitar navegar al unidirle al input dentro de un formulario
const form = document.getElementById('form');
const url = 'http://localhost:8000/mascotas';

let mascotas = [];

async function listarMacotas() {
    try {

        const respuesta = await fetch(url)
        const mascotasDelServer = await respuesta.json();
        if (Array.isArray(mascotasDelServer)) {
            mascotas = mascotasDelServer
        }
        if (mascotas.length > 0) {
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


            Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index))
            Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index))
            return;


        }
        listaMacotas.innerHTML = `
        <tr>
            
            <td colspan = "5" class="lista-vacia" >No hay mascotas</td>
         
        </tr>
        `


    } catch (error) {
        console.log({error});
      //throw error
       $(".alert").show(); //una vuelta con jquery
    }


}

//para evitar navegar al unidirle al input dentro de un formulario

async function enviarDatos(evento) { //nomalmente se pone solo e
    evento.preventDefault();

    try {

        const datos = {
            tipo: tipo.value,
            nombre: nombre.value,
            dueno: dueno.value
        };
        let method = "POST";
        let urlEnvio = url;
        const accion = btnGuardar.innerHTML;
        if (accion === "Editar") {
            //editar
            method = "PUT";
            mascotas[indice.value] = datos;
            urlEnvio = `${url}/${indice.value}`;

        }

        const respuesta = await fetch(urlEnvio, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        })

        if (respuesta.ok) {

            listarMacotas();
            resetModal()
        }

    } catch (error) {
        console.log({error});
        $(".alert").show(); //una vuelta con jquery

    }


}

//Guardar el estado

function editar(index) {

    //el handles se llama al dar click y se puede poner el nombre que queramos cambiar el handler por lo que sea
    return function handler() {

        btnGuardar.innerHTML = 'Editar'
        //$('#exampleModal').modal('toggle'); //funcionquery de bootstrap
        const mascota = mascotas[index];
        indice.value = index;
        tipo.value = mascota.tipo;
        nombre.value = mascota.nombre;
        dueno.value = mascota.dueno;

    }

}

function resetModal() {

    indice.value = ''
    tipo.value = '';
    nombre.value = '';
    dueno.value = '';
    btnGuardar.innerHTML = 'Crear'
}

function eliminar(index) {
    const urlEnvio = `${url}/${index}`
    return async function clickElminiar() {

        try {
            const respuesta = await fetch(urlEnvio, {
                method: 'DELETE',
            })

            if (respuesta.ok) {

                listarMacotas();
                resetModal()
            }

        } catch (error) {
            console.log({error});
            $(".alert").show(); //una vuelta con jquery
        }


    }

}

listarMacotas();



form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;