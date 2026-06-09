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
