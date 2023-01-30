const listaconsultas = document.getElementById("lista-consultas")
const mascota = document.getElementById("mascota");
const veterinaria = document.getElementById("veterinaria");
const historia = document.getElementById("historia");
const diagnostico = document.getElementById("diagnostico");
const indice = document.getElementById('indice');
const btnGuardar = document.getElementById('btn-guardar');

let consultas = [];
let mascotas = [];
let veterinarias = [];

const url = 'http://localhost:8000';

/*{
      mascota: 0,
      veterinaria: 0,
      fechaCreacion: new Date(),
      fechaEdicion: new Date(),
      historia: '',
      diagnostico: ''
    }
    */

async function listarConsultas() {
    const entidad = 'consultas'
    try {

        const respuesta = await fetch(`${url}/${entidad}`);
        const consultasDelServidor = await respuesta.json(); //await es promesa

        if (Array.isArray(consultasDelServidor)) {
            consultas = consultasDelServidor;
        }
        if (respuesta.ok) {
            const htmlConsultas = consultas.map(
                (consulta, indice) => (
                    `<tr>
                        <th scope="row">${indice}</th>
                            <td>${consulta.mascota.nombre}</td>
                            <td>${consulta.veterinaria.nombre} ${consulta.veterinaria.apellido}</td>
                            <td>${consulta.diagnostico}</td>
                            <td>${consulta.fechaCreacion}</td>
                            <td>${consulta.fechaEdicion}</td>
                        
                            <td>
                                 <div class="btn-group" role="group" aria-label="Basic example">
                                    <button class="editar" type="button" class="btn btn-info">Editar</button>
                                </div>
                        </td>
                    </tr>`
                )
            ).join("");
            listaconsultas.innerHTML = htmlConsultas;
            Array.from(document.getElementsByClassName('editar')).forEach(
                (botonEditar, index) => botonEditar.onclick = editar(index))
        }



    } catch (error) {
        console.log({ error });
        $(".alert").show();
    }
}



async function listarMascotas() {
    const entidad = 'mascotas'
    try {

        const respuesta = await fetch(`${url}/${entidad}`);
        const mascotasDelServidor = await respuesta.json(); //await es promesa

        if (Array.isArray(mascotasDelServidor)) {
            mascotas = mascotasDelServidor;
        }
        if (respuesta.ok) {
            mascotas.forEach((_mascota, indice) => {
                const optionActual = document.createElement("option");
                optionActual.innerHTML = _mascota.nombre;
                optionActual.value = indice;
                mascota.appendChild(optionActual);
            });

        }

        // if (respuesta.ok) {
        //     const htmlMascotas = mascotas.map(
        //         (mascota,indice) =>   {
        //             `<option value="${indice}">${mascota.nombre}</option>`
        //         }


        //     ).join("");
        //     mascota.innerHTML += htmlMascotas;


        // }


    } catch (error) {
        console.log({ error });
        $(".alert").show();
    }
}



async function listarVeterinarias() {
    const entidad = 'veterinarias'
    try {

        const respuesta = await fetch(`${url}/${entidad}`);
        const veterinariasDelServidor = await respuesta.json(); //await es promesa

        if (Array.isArray(veterinariasDelServidor)) {
            veterinarias = veterinariasDelServidor;
        }
        if (respuesta.ok) {
            veterinarias.forEach((_veterinaria, indice) => {
                const optionActual = document.createElement("option");
                optionActual.innerHTML = `${_veterinaria.nombre} ${_veterinaria.apellido}`;
                optionActual.value = indice;
                veterinaria.appendChild(optionActual);
            });

        }


    } catch (error) {
        console.log({ error });
        $(".alert").show();
    }
}

function resetModal() {

    indice.value = "";
    mascota.value = "";
    veterinaria.value = "";
    historia.value = "";
    diagnostico.value = "";
    btnGuardar.innerHTML = 'Crear'
   // $('#exampleModal').modal('toggle');
}


function editar(index) {

    //el handles se llama al dar click y se puede poner el nombre que queramos cambiar el handler por lo que sea
    return function handler() {

        btnGuardar.innerHTML = 'Editar'
        $('#exampleModal').modal('toggle'); //funcionquery de bootstrap
        const consulta = consultas[index];
        indice.value = index;
        mascota.value = consulta.mascota.id;
        veterinaria.value = consulta.veterinaria.id;
        historia.value = consulta.historia;
        diagnostico.value = consulta.diagnostico;


    }

}




async function enviarDatos(evento) { //nomalmente se pone solo e

    const entidad = "consultas";
    evento.preventDefault();
    try {
        const datos = {
            mascota: mascota.value,
            veterinaria: veterinaria.value,
            historia: historia.value,
            diagnostico: diagnostico.value,


        };
        if (validar(datos) === true) {
            const accion = btnGuardar.innerHTML;
            let urlEnvio = `${url}/${entidad}`
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

                listarConsultas();
                resetModal();
            }
            return;
           
        }
        alert ("formulario incompleto")
  
    } catch (error) {
        console.log({ error });
        $(".alert").show();
        //console.log({ error });
        //$(".alert").show();
    }
}
function validar(datos) {
    if (typeof datos !== 'object') return false;
    for (let llave in datos) {
      if (datos[llave].lenght === 0) return false;
    }
    return true;
}

listarVeterinarias();
listarConsultas();
listarMascotas();

btnGuardar.onclick = enviarDatos;