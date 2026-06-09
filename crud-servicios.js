// VERIFICAR ACCESO ADMIN
verificarAdmin();
// LISTA DE SERVICIOS
let servicios = [];
let contador = 1;

// AGREGAR SERVICIO
document.getElementById("form-servicio").addEventListener("submit", function(e) {
  e.preventDefault();

  // Obtener los valores del formulario
  let nombre = document.getElementById("nombre-servicio").value;
  let descripcion = document.getElementById("descripcion").value;
  let precio = document.getElementById("precio-servicio").value;
  let duracion = document.getElementById("duracion").value;

  // Crear el servicio
  let servicio = {
    id: contador,
    nombre: nombre,
    descripcion: descripcion,
    precio: precio,
    duracion: duracion
  };

  // Agregar a la lista
  servicios.push(servicio);
  contador++;

  // Mostrar en la tabla
  mostrarServicios();

  // Limpiar el formulario
  document.getElementById("form-servicio").reset();
});

// MOSTRAR SERVICIOS EN LA TABLA
function mostrarServicios() {
  let cuerpo = document.getElementById("cuerpo-tabla-servicios");
  cuerpo.innerHTML = "";

  servicios.forEach(function(servicio) {
    cuerpo.innerHTML += `
      <tr>
        <td>${servicio.id}</td>
        <td>${servicio.nombre}</td>
        <td>${servicio.descripcion}</td>
        <td>S/. ${servicio.precio}</td>
        <td>${servicio.duracion}</td>
        <td>
          <button onclick="eliminarServicio(${servicio.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// ELIMINAR SERVICIO
function eliminarServicio(id) {
  servicios = servicios.filter(function(servicio) {
    return servicio.id !== id;
  });
  mostrarServicios();
}
