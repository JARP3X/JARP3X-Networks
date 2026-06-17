// LISTA DEL CARRITO
let carrito = [];

// AGREGAR AL CARRITO
function agregarAlCarrito(nombre, precio) {
  let itemExistente = carrito.find(function(item) {
    return item.nombre === nombre;
  });

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
  }

  actualizarCarrito();
  abrirCarrito();
}

// ACTUALIZAR CARRITO
function actualizarCarrito() {
  let contador = document.getElementById("contador-carrito");
  let itemsCarrito = document.getElementById("items-carrito");
  let totalMonto = document.getElementById("total-monto");

  let totalItems = carrito.reduce(function(sum, item) {
    return sum + item.cantidad;
  }, 0);

  contador.textContent = totalItems;

  if (carrito.length === 0) {
    itemsCarrito.innerHTML = '<p id="carrito-vacio">Tu carrito está vacío</p>';
    totalMonto.textContent = "S/. 0.00";
    return;
  }

  let html = "";
  let total = 0;

  carrito.forEach(function(item) {
    let subtotal = item.precio * item.cantidad;
    total += subtotal;
    html += `
      <div class="carrito-item">
        <p>${item.nombre}</p>
        <div class="carrito-item-controles">
          <button onclick="cambiarCantidad('${item.nombre}', -1)">-</button>
          <span>${item.cantidad}</span>
          <button onclick="cambiarCantidad('${item.nombre}', 1)">+</button>
          <span>S/. ${subtotal.toFixed(2)}</span>
          <button onclick="eliminarDelCarrito('${item.nombre}')">🗑️</button>
        </div>
      </div>
    `;
  });

  itemsCarrito.innerHTML = html;
  totalMonto.textContent = "S/. " + total.toFixed(2);
}

// CAMBIAR CANTIDAD
function cambiarCantidad(nombre, cambio) {
  let item = carrito.find(function(i) { return i.nombre === nombre; });
  if (item) {
    item.cantidad += cambio;
    if (item.cantidad <= 0) {
      eliminarDelCarrito(nombre);
      return;
    }
  }
  actualizarCarrito();
}

// ELIMINAR DEL CARRITO
function eliminarDelCarrito(nombre) {
  carrito = carrito.filter(function(item) { return item.nombre !== nombre; });
  actualizarCarrito();
}

// VACIAR CARRITO
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

// ABRIR/CERRAR CARRITO
function toggleCarrito() {
  let panel = document.getElementById("panel-carrito");
  panel.classList.toggle("abierto");
}

function abrirCarrito() {
  let panel = document.getElementById("panel-carrito");
  panel.classList.add("abierto");
}

// IR A PAGO
function irAPago() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }
  localStorage.setItem("carritoGuardado", JSON.stringify(carrito));
  window.location.href = "pago.html";
}