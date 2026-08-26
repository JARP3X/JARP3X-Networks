// ============================================
// CRUD DE CLIENTES - Conectado al backend Flask
// ============================================

const API_URL = "https://jarp3x-backend.onrender.com";

// Al cargar la página, traer los clientes desde la base de datos
document.addEventListener("DOMContentLoaded", function () {
  cargarClientes();
});

// AGREGAR CLIENTE
document.getElementById("form-cliente").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  if (nombre === "" || email === "" || telefono === "") {
    alert("Por favor completa todos los campos");
    return;
  }

  fetch(API_URL + "/clientes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, telefono })
  })
    .then(function (response) {
      return response.json().then(function (data) {
        return { ok: response.ok, data: data };
      });
    })
    .then(function (resultado) {
      if (resultado.ok) {
        document.getElementById("form-cliente").reset();
        cargarClientes();
      } else {
        alert(resultado.data.error || "No se pudo agregar el cliente");
      }
    })
    .catch(function (error) {
      alert("No se pudo conectar con el servidor");
      console.error(error);
    });
});

// CARGAR Y MOSTRAR CLIENTES DESDE LA BASE DE DATOS
function cargarClientes() {
  fetch(API_URL + "/clientes")
    .then(function (response) {
      return response.json();
    })
    .then(function (clientes) {
      mostrarClientes(clientes);
    })
    .catch(function (error) {
      alert("No se pudo conectar con el servidor");
      console.error(error);
    });
}

// MOSTRAR CLIENTES EN LA TABLA
function mostrarClientes(clientes) {
  const cuerpo = document.getElementById("cuerpo-tabla");
  cuerpo.innerHTML = "";

  clientes.forEach(function (cliente) {
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
  fetch(API_URL + "/clientes/" + id, {
    method: "DELETE"
  })
    .then(function (response) {
      return response.json().then(function (data) {
        return { ok: response.ok, data: data };
      });
    })
    .then(function (resultado) {
      if (resultado.ok) {
        cargarClientes();
      } else {
        alert(resultado.data.error || "No se pudo eliminar el cliente");
      }
    })
    .catch(function (error) {
      alert("No se pudo conectar con el servidor");
      console.error(error);
    });
}