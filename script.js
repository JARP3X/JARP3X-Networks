
// LISTA DE CLIENTES
let clientes = [];
let contador = 1;

// AGREGAR CLIENTE
document.getElementById("form-cliente").addEventListener("submit", function(e) {
  e.preventDefault();

  // Obtener los valores del formulario
  let nombre = document.getElementById("nombre").value;
  let email = document.getElementById("email").value;
  let telefono = document.getElementById("telefono").value;

  // Crear el cliente
  let cliente = {
    id: contador,
    nombre: nombre,
    email: email,
    telefono: telefono
  };

  // Agregar a la lista
  clientes.push(cliente);
  contador++;

  // Mostrar en la tabla
  mostrarClientes();

  // Limpiar el formulario
  document.getElementById("form-cliente").reset();
});

// MOSTRAR CLIENTES EN LA TABLA
function mostrarClientes() {
  let cuerpo = document.getElementById("cuerpo-tabla");
  cuerpo.innerHTML = "";

  clientes.forEach(function(cliente) {
    cuerpo.innerHTML += `
      <tr>
        <td>${cliente.id}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefono}</td>
        <td>
          <button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// ELIMINAR CLIENTE
function eliminarCliente(id) {
  clientes = clientes.filter(function(cliente) {
    return cliente.id !== id;
  });
  mostrarClientes();
}
