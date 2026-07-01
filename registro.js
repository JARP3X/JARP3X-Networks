// REGISTRO DE USUARIO
document.getElementById("form-registro").addEventListener("submit", function(e) {
  e.preventDefault();

  // Obtener valores del formulario
  let nombre = document.getElementById("nombre").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmar = document.getElementById("confirmar").value;

  // Validaciones
  if (nombre === "" || email === "" || password === "" || confirmar === "") {
    alert("Por favor completa todos los campos");
    return;
  }

  if (password.length < 6) {
    alert("La contraseña debe tener mínimo 6 caracteres");
    return;
  }

  if (password !== confirmar) {
    alert("Las contraseñas no coinciden");
    return;
  }

  // Enviar datos al servidor Flask
  fetch("http://127.0.0.1:5000/registrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    if (data.mensaje) {
      alert("¡Cuenta creada exitosamente!");
      window.location.href = "login.html";
    } else {
      alert("Error: " + data.error);
    }
  })
  .catch(function(error) {
    alert("No se pudo conectar con el servidor");
    console.error(error);
  });
});