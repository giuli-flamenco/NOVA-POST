
// ===============================
// VENTAS
// ===============================

let productos = JSON.parse(localStorage.getItem("productos")) || [];
let carrito = [];
let total = 0;


// ===============================
// BUSCAR PRODUCTO
// ===============================

function buscarProducto() {

    const codigo = document.getElementById("codigo").value.trim();

    const producto = productos.find(p => p.codigo === codigo);

    if (!producto) {
        alert("Producto no encontrado.");
        return;
    }

    if (producto.stockActual <= 0) {
        alert("Sin stock disponible.");
        return;
    }

    carrito.push({
        codigo: producto.codigo,
        nombre: producto.nombre,
        precio: producto.venta,
        cantidad: 1
    });

    actualizarVenta();

    document.getElementById("codigo").value = "";
}


// ===============================
// ACTUALIZAR TABLA
// ===============================

function actualizarVenta() {

    const tabla = document.getElementById("tablaVenta");

    tabla.innerHTML = "";

    total = 0;

    carrito.forEach(item => {

        const subtotal = item.precio * item.cantidad;

        total += subtotal;

        tabla.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>$${item.precio}</td>
                <td>${item.cantidad}</td>
                <td>$${subtotal}</td>
            </tr>
        `;
    });

    document.getElementById("total").textContent = total;
}


// ===============================
// CALCULAR VUELTO
// ===============================

function calcularVuelto() {

    const pagaCon = Number(document.getElementById("pagaCon").value);

    if (pagaCon < total) {
        alert("El dinero recibido es menor al total.");
        return;
    }

    document.getElementById("vuelto").textContent = pagaCon - total;
}


// ===============================
// FINALIZAR VENTA (PRO)
// ===============================

function finalizarVenta() {

    if (carrito.length === 0) {
        alert("No hay productos en la venta.");
        return;
    }

    let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    // 👤 USUARIO ACTUAL
    const usuario = localStorage.getItem("usuario") || "desconocido";

   
const metodoPago = document.getElementById("metodoPago").value;

const nuevaVenta = {
    fecha: new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString(),
    productos: carrito,
    total: total,
    usuario: localStorage.getItem("usuario") || "desconocido",
    pago: metodoPago
};

    ventas.push(nuevaVenta);
    localStorage.setItem("ventas", JSON.stringify(ventas));

    // 🔻 DESCONTAR STOCK
    carrito.forEach(item => {

        let prod = productos.find(p => p.codigo === item.codigo);

        if (prod) {
            prod.stockActual -= item.cantidad;

            if (prod.stockActual < 0) {
                prod.stockActual = 0;
            }
        }
    });

    localStorage.setItem("productos", JSON.stringify(productos));

    alert("✅ Venta realizada correctamente.");

    carrito = [];
    total = 0;

    actualizarVenta();

    document.getElementById("pagaCon").value = "";
    document.getElementById("vuelto").textContent = "0";
}


// ===============================
// ENTER = BUSCAR
// ===============================

document.getElementById("codigo").addEventListener("keypress", function(e) {

    if (e.key === "Enter") {
        buscarProducto();
    }
});


// ===============================
// 📷 SCANNER CÁMARA
// ===============================

function iniciarScanner() {

    const qr = new Html5Qrcode("reader");

    qr.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: 250
        },
        (codigo) => {

            buscarPorCodigo(codigo);

            let audio = new Audio("https://www.soundjay.com/buttons/sounds/beep-07.mp3");
            audio.play();

            qr.stop();
        }
    );
}


// ===============================
// 🔍 BUSCAR POR CÓDIGO (SCANNER)
// ===============================

function buscarPorCodigo(codigo) {

    const producto = productos.find(p => p.codigo === codigo);

    if (!producto) {
        alert("Producto no encontrado");
        return;
    }

    if (producto.stockActual <= 0) {
        alert("Sin stock");
        return;
    }

    carrito.push({
        codigo: producto.codigo,
        nombre: producto.nombre,
        precio: producto.venta,
        cantidad: 1
    });

    actualizarVenta();
}