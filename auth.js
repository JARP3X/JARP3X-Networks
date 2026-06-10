// VERIFICAR SI HAY SESIÓN ACTIVA
function verificarSesion() {
  let rol = localStorage.getItem("rol");
  if (!rol) {
    window.location.href = "login.html";
  }
}

// VERIFICAR SI ES ADMIN
function verificarAdmin() {
  let rol = localStorage.getItem("rol");
  if (rol !== "admin") {
    window.location.href = "index.html";
  }
}

// CERRAR SESIÓN
function cerrarSesion() {
  localStorage.removeItem("rol");
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}

// EJECUTAR VERIFICACIÓN AUTOMÁTICA SEGÚN LA PÁGINA
let paginaActual = window.location.pathname;

if (paginaActual.includes("productos.html") ||
    paginaActual.includes("ventas.html")) {
  verificarSesion();
}

if (paginaActual.includes("clientes.html") ||
    paginaActual.includes("crud-productos.html") ||
    paginaActual.includes("crud-servicios.html")) {
  verificarAdmin();
}
