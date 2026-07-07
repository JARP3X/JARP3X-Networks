// USUARIOS DEL SISTEMA - ahora conectado a la base de datos
document
  .getElementById("form-login")
  .addEventListener("submit", function(e) {
    e.preventDefault();

  const email = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Por favor completa todos los campos");
    return;
  }

  // Conectar con Flask
  fetch("https://jarp3x-backend.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(function(response) {
        return response.json().then(function(data) {
          return {
            ok: response.ok,
            data: data
          };
        });
      })
      .then(function(resultado) {
        const data = resultado.data;

        if (resultado.ok) {
          localStorage.setItem("rol", data.rol);
          localStorage.setItem("usuario", data.usuario);

          if (data.rol === "admin") {
            window.location.href = "dashboard-admin.html";
          } else {
            window.location.href = "dashboard-cliente.html";
          }
        } else {
          alert(data.error || "No se pudo iniciar sesión");
        }
      })
      .catch(function(error) {
        alert("No se pudo conectar con el servidor");
        console.error(error);
      });
  });
