const listaconsultas = document.getElementById("lista-consultas")

let consultas = [];
const url = 'http://localhost:8000/consultas';

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
    try {

        const respuesta = await fetch(url);
        const consultasDelServidor = await respuesta.json(); //await es promesa

        if (Array.isArray(consultasDelServidor)) {
            consultas = consultasDelServidor;
        }
        if (respuesta.ok) {
            const htmlConsultas = consultas.map(
                (consulta,indice) =>   (
                    `<tr>
                        <th scope="row">${indice}</th>
                            <td>${consulta.mascota.nombre}</td>
                            <td>${consulta.veterinaria.nombre} ${consulta.veterinaria.apellido}</td>
                            <td>${consulta.diagnostico}</td>
                            <td>${consulta.fechaCreacion}</td>
                            <td>${consulta.fechaEdicion}</td>
                        
                            <td>
                                 <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-info">Editar</button>
                                </div>
                        </td>
                    </tr>`
                )
            ).join("");
            listaconsultas.innerHTML=htmlConsultas;

        }



    } catch (error) {
        throw error
    }
}

listarConsultas();