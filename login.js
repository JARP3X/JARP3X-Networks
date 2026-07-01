// USUARIOS DEL SISTEMA - ahora conectado a la base de datos
document.getElementById("form-login").addEventListener("submit", function(e) {
  e.preventDefault();

  let usuario = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;

  if (usuario === "" || password === "") {
    alert("Por favor completa todos los campos");
    return;
  }

  // Conectar con Flask
  fetch("http://127.0.0.1:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: usuario, password: password })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    if (data.mensaje) {
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("usuario", data.usuario);

      if (data.rol === "admin") {
        window.location.href = "dashboard-admin.html";
      } else {
        window.location.href = "dashboard-cliente.html";
      }
    } else {
      alert("Error: " + data.error);
    }
  })
  .catch(function(error) {
    alert("No se pudo conectar con el servidor");
    console.error(error);
  });
});