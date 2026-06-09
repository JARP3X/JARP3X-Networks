// VERIFICAR ACCESO ADMIN
verificarAdmin();
// LISTA DE PRODUCTOS
let productos = [];
let contador = 1;

// AGREGAR PRODUCTO
document.getElementById("form-producto").addEventListener("submit", function(e) {
  e.preventDefault();

  // Obtener los valores del formulario
  let nombre = document.getElementById("nombre-producto").value;
  let categoria = document.getElementById("categoria").value;
  let precio = document.getElementById("precio").value;
  let stock = document.getElementById("stock").value;

  // Crear el producto
  let producto = {
    id: contador,
    nombre: nombre,
    categoria: categoria,
    precio: precio,
    stock: stock
  };

  // Agregar a la lista
  productos.push(producto);
  contador++;

  // Mostrar en la tabla
  mostrarProductos();

  // Limpiar el formulario
  document.getElementById("form-producto").reset();
});

// MOSTRAR PRODUCTOS EN LA TABLA
function mostrarProductos() {
  let cuerpo = document.getElementById("cuerpo-tabla-productos");
  cuerpo.innerHTML = "";

  productos.forEach(function(producto) {
    cuerpo.innerHTML += `
      <tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>S/. ${producto.precio}</td>
        <td>${producto.stock}</td>
        <td>
          <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// ELIMINAR PRODUCTO
function eliminarProducto(id) {
  productos = productos.filter(function(producto) {
    return producto.id !== id;
  });
  mostrarProductos();
}
