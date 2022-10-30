const listaMacotas = document.getElementById('lista-mascotas');

let mascotas = [
    {
        tipo: "Gato",
        nombre: "Manchas",
        dueno: "Esteban"
    }
];

function listarMacotas() {
    const htmlMascotas = mascotas.map((mascota, indice) =>
        `
            <tr>
                <th scope="row">${indice}</th>
                <td>${mascota.tipo}</td>
                <td>${mascota.nombre}</td>
                <td>${mascota.dueno}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                     <button type="button" class="btn btn-info">Editar</button>
                     <button type="button" class="btn btn-danger">Eliminar</button>
                    </div>
                </td>
            </tr>
        `).join("");
        listaMacotas.innerHTML = htmlMascotas;
}


listarMacotas(); 