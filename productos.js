// ===============================
// PRODUCTOS
// ===============================

let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Mostrar productos al abrir
mostrarProductos();

// ===============================
// GUARDAR PRODUCTO
// ===============================
function guardarProducto() {

    const codigo = document.getElementById("codigo").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const compra = Number(document.getElementById("precioCompra").value);
    const venta = Number(document.getElementById("precioVenta").value);
    const stockInicial = Number(document.getElementById("stock").value);

    if (codigo === "" || nombre === "" || compra <= 0 || venta <= 0 || stockInicial < 0) {
        alert("Complete todos los datos.");
        return;
    }

    productos.push({

        codigo: codigo,
        nombre: nombre,
        compra: compra,
        venta: venta,

        stockInicial: stockInicial,
        stockActual: stockInicial,

        categoria: "General"

    });

    guardarProductos();

    limpiar();

    mostrarProductos();
}

// ===============================
// GUARDAR EN LOCALSTORAGE
// ===============================
function guardarProductos() {

    localStorage.setItem("productos", JSON.stringify(productos));

}

// ===============================
// MOSTRAR PRODUCTOS
// ===============================
function mostrarProductos() {

    const tabla = document.getElementById("tablaProductos");

    tabla.innerHTML = "";

    productos.forEach((p, i) => {

        tabla.innerHTML += `

        <tr>

            <td>${p.codigo}</td>

            <td>${p.nombre}</td>

            <td>$${p.compra}</td>

            <td>$${p.venta}</td>

            <td>${p.stockInicial}</td>

            <td>${p.stockActual}</td>

            <td>

                <button onclick="editar(${i})">✏️</button>

                <button onclick="eliminar(${i})">🗑️</button>

            </td>

        </tr>

        `;

    });

}

// ===============================
// ELIMINAR
// ===============================
function eliminar(i) {

    if (confirm("¿Eliminar producto?")) {

        productos.splice(i, 1);

        guardarProductos();

        mostrarProductos();

    }

}

// ===============================
// EDITAR
// ===============================
function editar(i) {

    const p = productos[i];

    document.getElementById("codigo").value = p.codigo;
    document.getElementById("nombre").value = p.nombre;
    document.getElementById("precioCompra").value = p.compra;
    document.getElementById("precioVenta").value = p.venta;

    document.getElementById("stock").value = p.stockActual;

    eliminar(i);

}

// ===============================
// LIMPIAR
// ===============================
function limpiar() {

    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("precioCompra").value = "";
    document.getElementById("precioVenta").value = "";
    document.getElementById("stock").value = "";

}