// OBTENER CARRITO DEL localStorage
let carrito = JSON.parse(localStorage.getItem("carritoGuardado")) || [];

// MOSTRAR RESUMEN DEL PEDIDO
function mostrarResumen() {
  let resumen = document.getElementById("resumen-pedido");
  let totalPago = document.getElementById("total-pago");
  let montoYape = document.getElementById("monto-yape");

  if (carrito.length === 0) {
    resumen.innerHTML = "<p>Tu carrito está vacío. <a href='productos.html'>Ver productos</a></p>";
    return;
  }

  let html = "<table><thead><tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Subtotal</th></tr></thead><tbody>";
  let total = 0;

  carrito.forEach(function(item) {
    let subtotal = item.precio * item.cantidad;
    total += subtotal;
    html += `
      <tr>
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>S/. ${item.precio.toFixed(2)}</td>
        <td>S/. ${subtotal.toFixed(2)}</td>
      </tr>
    `;
  });

  html += "</tbody></table>";
  resumen.innerHTML = html;
  totalPago.textContent = "S/. " + total.toFixed(2);
  montoYape.textContent = "S/. " + total.toFixed(2);
}

// SELECCIONAR MÉTODO DE PAGO
function seleccionarMetodo(metodo) {
  document.getElementById("panel-paypal").style.display = "none";
  document.getElementById("panel-yape").style.display = "none";

  document.querySelectorAll(".metodo-card").forEach(function(card) {
    card.classList.remove("seleccionado");
  });

  if (metodo === "paypal") {
    document.getElementById("panel-paypal").style.display = "block";
    iniciarPayPal();
  } else if (metodo === "yape") {
    document.getElementById("panel-yape").style.display = "block";
  }
}

// INICIAR PAYPAL
function iniciarPayPal() {
  let total = 0;
  carrito.forEach(function(item) {
    total += item.precio * item.cantidad;
  });

  document.getElementById("paypal-button-container").innerHTML = `
    <a href="https://www.paypal.com/paypalme/JARP3X/${total}" 
       target="_blank" 
       class="btn-primary" 
       style="display:inline-block; margin-top:15px;">
      Pagar S/. ${total.toFixed(2)} con PayPal
    </a>
  `;
}

// CONFIRMAR PAGO YAPE
function confirmarYape() {
  alert("¡Gracias por tu pago con Yape! Te contactaremos pronto para confirmar tu pedido.");
  localStorage.removeItem("carritoGuardado");
  window.location.href = "index.html";
}

// INICIAR
mostrarResumen();