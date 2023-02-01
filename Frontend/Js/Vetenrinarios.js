const listaVeterinarios = document.getElementById('lista-veterinarios');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const documento = document.getElementById('documento');

const indice = document.getElementById('indice');
//boton guardar
const btnGuardar = document.getElementById('btn-guardar');
//para evitar navegar al unidirle al input dentro de un formulario
const form = document.getElementById('form');
const url = 'https://backend-ashen-ten.vercel.app/veterinarias';


let veterinarios = [];

async function listarVeterinarios() {
    try {
        const respuesta = await fetch(url)
        const veterinariosDelServer = await respuesta.json();
        if (Array.isArray(veterinariosDelServer)) {
            veterinarios = veterinariosDelServer
        }
        if (veterinarios.length > 0) {
            const htmlVeterinarios = veterinarios.map((veterinario, index) =>
                `
                <tr>
                    <th scope="row">${index}</th>
                    <td>${veterinario.nombre}</td>
                    <td>${veterinario.apellido}</td>
                    <td>${veterinario.documento}</td>
                    
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
                         <button type="button" class="btn btn-danger eliminar">Eliminar</button>
                        </div>
                    </td>
                </tr>
            `).join("");
            listaVeterinarios.innerHTML = htmlVeterinarios;


            Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index))
            Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index))
            return;
        }
        listaVeterinarios.innerHTML = `
        <tr>
            
            <td colspan = "5" class="lista-vacia" >No hay Veterinarios</td>
         
        </tr>
        `

    } catch (error) {
        console.log({ error });
        //throw error
        $(".alert").show(); //una vuelta con jquery
    }

}

//para evitar navegar al unidirle al input dentro de un formulario

async function enviarDatos(evento) { //nomalmente se pone solo e
    evento.preventDefault();
    try {
        const datos = {
            nombre: nombre.value,
            apellido: apellido.value,
            documento: documento.value,

        };
        const accion = btnGuardar.innerHTML;
        let urlEnvio = url
        let method = 'POST';
        if (accion === 'Editar') {
            urlEnvio += `/${indice.value}`;  //otra forma que se hace
            //editar
            method = "PUT"
        }
        const respuesta = await fetch(urlEnvio, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
            mode: "cors",
        })

        if (respuesta.ok) {

            listarVeterinarios();
            resetModal()
        }
    } catch (error) {
        console.log({ error });
        $(".alert").show(); //una vuelta con jquery
    }


}
//Guardar el estado

function editar(index) {

    //el handles se llama al dar click y se puede poner el nombre que queramos cambiar el handler por lo que sea
    return function handler() {

        btnGuardar.innerHTML = 'Editar'
        //$('#exampleModal').modal('toggle'); //funcionquery de bootstrap
        const veterinario = veterinarios[index];
        indice.value = index;
        nombre.value = veterinario.nombre;
        apellido.value = veterinario.apellido;
        documento.value = veterinario.documento;


    }

}

function resetModal() {

    indice.value = ''
    nombre.value = '';
    apellido.value = '';
    documento.value = '';
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

                listarVeterinarios();
                resetModal()
            }
        } catch (error) {
            console.log({ error });
            $(".alert").show(); //una vuelta con jquery
        }




    }

}

listarVeterinarios();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;