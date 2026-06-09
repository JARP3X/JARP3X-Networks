// USUARIOS DEL SISTEMA
let usuarios = [
  { usuario: "admin", password: "admin123", rol: "admin" },
  { usuario: "cliente", password: "cliente123", rol: "cliente" }
];

// VERIFICAR LOGIN
document.getElementById("form-login").addEventListener("submit", function(e) {
  e.preventDefault();

  // Obtener los valores del formulario
  let usuario = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;

  // Buscar el usuario en la lista
  let encontrado = usuarios.find(function(u) {
    return u.usuario === usuario && u.password === password;
  });

  // Verificar si el usuario existe
  if (encontrado) {
    // Guardar el rol en el navegador
    localStorage.setItem("rol", encontrado.rol);
    localStorage.setItem("usuario", encontrado.usuario);

    // Redirigir según el rol
    if (encontrado.rol === "admin") {
      window.location.href = "crud-productos.html";
    } else {
      window.location.href = "productos.html";
    }

  } else {
    alert("Usuario o contraseña incorrectos");
  }
});
