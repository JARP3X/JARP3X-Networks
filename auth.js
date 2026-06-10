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

// CAMBIAR MENÚ SEGÚN ROL
function actualizarMenu() {
  let rol = localStorage.getItem("rol");
  let usuario = localStorage.getItem("usuario");
  let nav = document.getElementById("menu-nav");

  if (!nav) return;

  if (rol === "admin") {
    nav.innerHTML = `
      <a href="index.html">Inicio</a>
      <a href="productos.html">Productos</a>
      <a href="ventas.html">Ventas</a>
      <a href="clientes.html">Clientes</a>
      <a href="crud-productos.html">CRUD Productos</a>
      <a href="crud-servicios.html">CRUD Servicios</a>
      <span style="color:#ff6600;">👤 ${usuario}</span>
      <a href="#" onclick="cerrarSesion()">Cerrar Sesión</a>
    `;
  } else if (rol === "cliente") {
    nav.innerHTML = `
      <a href="index.html">Inicio</a>
      <a href="productos.html">Productos</a>
      <a href="ventas.html">Ventas</a>
      <span style="color:#ff6600;">👤 ${usuario}</span>
      <a href="#" onclick="cerrarSesion()">Cerrar Sesión</a>
    `;
  }
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

// ACTUALIZAR MENÚ EN TODAS LAS PÁGINAS
actualizarMenu();
