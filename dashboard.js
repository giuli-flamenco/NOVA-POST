// ===============================
// DASHBOARD
// ===============================

// Usuario activo
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

// Si no inició sesión vuelve al login
if (!usuarioActivo) {
    window.location.href = "login.html";
}

// ===============================
// PERMISOS
// ===============================
if (usuarioActivo.tipo !== "Administrador") {

    document.getElementById("btnProductos").style.display = "none";
    document.getElementById("btnUsuarios").style.display = "none";
    document.getElementById("btnReportes").style.display = "none";

}

// ===============================
// PRODUCTOS
// ===============================
const productos = JSON.parse(localStorage.getItem("productos")) || [];

document.getElementById("cantidadProductos").textContent = productos.length;

// ===============================
// STOCK BAJO
// ===============================
let stockBajo = 0;

productos.forEach(producto => {

    if (producto.stockActual <= 5) {

        stockBajo++;

    }

});

document.getElementById("stockBajo").textContent = stockBajo;

// ===============================
// CLIENTES
// ===============================
const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

document.getElementById("cantidadClientes").textContent = clientes.length;

// ===============================
// VENTAS DE HOY
// ===============================
const ventas = JSON.parse(localStorage.getItem("ventas")) || [];

let totalHoy = 0;

const hoy = new Date().toLocaleDateString();

ventas.forEach(v => {

    if (v.fecha === hoy) {

        totalHoy += v.total;

    }

});

document.getElementById("ventasHoy").textContent = "$" + totalHoy.toLocaleString();

// ===============================
// CERRAR SESIÓN
// ===============================
function cerrarSesion() {

    localStorage.removeItem("usuarioActivo");

    window.location.href = "login.html";

}