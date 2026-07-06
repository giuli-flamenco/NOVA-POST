// ===============================
// CARGAR VENTAS
// ===============================

let ventas = JSON.parse(localStorage.getItem("ventas")) || [];
let egresos = JSON.parse(localStorage.getItem("egresos")) || [];

// ===============================
// INICIAR
// ===============================

function init() {

    ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    document.getElementById("resumen").innerHTML = "";

    mostrarResumen(ventas);
    mostrarHistorial(ventas);
    ventasPorUsuario(ventas);
    ventasPorEmpleado();
    cierreCajaHoy();
    cajaDiaria();
    mostrarEgresos();
}

// ===============================
// RESUMEN
// ===============================

function mostrarResumen(lista) {

    let totalVentas = lista.length;
    let totalDinero = 0;
    let productosVendidos = {};

    lista.forEach(v => {

        totalDinero += v.total;

        v.productos.forEach(p => {

            if (!productosVendidos[p.nombre]) {
                productosVendidos[p.nombre] = 0;
            }

            productosVendidos[p.nombre] += p.cantidad;
        });
    });

    let html = `
        <h3>💰 Total vendido: $${totalDinero}</h3>
        <h3>🧾 Cantidad de ventas: ${totalVentas}</h3>
        <hr>
        <h3>📦 Productos vendidos:</h3>
    `;

    for (let p in productosVendidos) {
        html += `<p>${p}: ${productosVendidos[p]}</p>`;
    }

    document.getElementById("resumen").innerHTML = html;
}

// ===============================
// BORRAR VENTA
// ===============================

function borrarVenta(indice){

    let rol = localStorage.getItem("rol");

    if(rol !== "admin"){
        alert("Solo la administradora puede borrar ventas.");
        return;
    }

    if(!confirm("¿Eliminar esta venta?")){
        return;
    }

    ventas.splice(indice,1);

    localStorage.setItem("ventas",JSON.stringify(ventas));

    init();

    alert("Venta eliminada correctamente.");
}

// ===============================
// HISTORIAL
// ===============================

function mostrarHistorial(lista){

    let div=document.getElementById("historial");

    div.innerHTML="";

    let rol=localStorage.getItem("rol");

    lista.slice().reverse().forEach(v=>{

        let indice=ventas.indexOf(v);

        div.innerHTML+=`

        <div style="border:1px solid #ccc;padding:10px;margin:10px;border-radius:8px;">

            <p>📅 ${v.fecha} ${v.hora}</p>
            <p>👤 Usuario: ${v.usuario || "desconocido"}</p>
            <p>💰 Total: $${v.total}</p>
            <p>📦 Productos: ${v.productos.length}</p>

            ${rol==="admin" ? `
            <button onclick="borrarVenta(${indice})"
            style="
            background:#d90429;
            color:white;
            border:none;
            padding:10px 15px;
            border-radius:8px;
            cursor:pointer;
            font-weight:bold;">
            🗑️ Eliminar venta
            </button>
            ` : ""}

        </div>

        `;

    });

}

// ===============================
// FILTRAR
// ===============================

function filtrar(){

    let fecha=document.getElementById("fechaFiltro").value;

    if(!fecha) return;

    let filtradas=ventas.filter(v=>v.fecha===fecha);

    mostrarResumen(filtradas);
    mostrarHistorial(filtradas);

}

// ===============================
// RESET
// ===============================

function reset(){

    mostrarResumen(ventas);
    mostrarHistorial(ventas);

}

// ===============================
// VENTAS POR USUARIO
// ===============================

function ventasPorUsuario(lista){

    let resumen={};

    lista.forEach(v=>{

        let user=v.usuario || "desconocido";

        if(!resumen[user]){
            resumen[user]={cantidad:0,total:0};
        }

        resumen[user].cantidad++;
        resumen[user].total+=v.total;

    });

    let html="<hr><h3>👤 Ventas por usuario</h3>";

    for(let user in resumen){

        html+=`<p>${user} → Ventas: ${resumen[user].cantidad} | Total: $${resumen[user].total}</p>`;

    }

    document.getElementById("resumen").innerHTML+=html;

}

// ===============================
// VENTAS POR EMPLEADO
// ===============================

function ventasPorEmpleado(){

    let resumen={};

    ventas.forEach(v=>{

        let user=v.usuario || "desconocido";

        if(!resumen[user]){
            resumen[user]={cantidad:0,total:0};
        }

        resumen[user].cantidad++;
        resumen[user].total+=v.total;

    });

    let html="<hr><h2>🧾 VENTAS POR EMPLEADO</h2>";

    for(let user in resumen){

        html+=`
        <div style="border:1px solid #ccc;padding:10px;margin:10px;">
            <h3>👤 ${user}</h3>
            <p>🧾 Ventas: ${resumen[user].cantidad}</p>
            <p>💰 Total: $${resumen[user].total}</p>
        </div>
        `;

    }

    document.getElementById("resumen").innerHTML+=html;

}

// ===============================
// CIERRE DE CAJA HOY
// ===============================

function cierreCajaHoy(){

    let hoy=new Date().toLocaleDateString();

    let ventasHoy=ventas.filter(v=>v.fecha===hoy);

    let totalDinero=0;
    let productos={};

    ventasHoy.forEach(v=>{

        totalDinero+=v.total;

        v.productos.forEach(p=>{

            if(!productos[p.nombre]){
                productos[p.nombre]=0;
            }

            productos[p.nombre]+=p.cantidad;

        });

    });

    let html=`
    <hr>
    <h2>📅 CIERRE DE CAJA HOY (${hoy})</h2>
    <h3>🧾 Ventas: ${ventasHoy.length}</h3>
    <h3>💰 Total: $${totalDinero}</h3>
    `;

    for(let p in productos){

        html+=`<p>${p}: ${productos[p]}</p>`;

    }

    document.getElementById("resumen").innerHTML+=html;

}

// ===============================
// CAJA DIARIA
// ===============================

function cajaDiaria(){

    let hoy=new Date().toLocaleDateString();

    let ventasHoy=ventas.filter(v=>v.fecha===hoy);

    let totalDinero=0;
    let usuarios={};

    ventasHoy.forEach(v=>{

        totalDinero+=v.total;

        let user=v.usuario || "desconocido";

        if(!usuarios[user]){
            usuarios[user]={ventas:0,total:0};
        }

        usuarios[user].ventas++;
        usuarios[user].total+=v.total;

    });

    let html=`
    <hr>
    <h2>💰 CAJA DIARIA (${hoy})</h2>
    <h3>💵 Total: $${totalDinero}</h3>
    `;

    for(let u in usuarios){

        html+=`<p>${u} → ${usuarios[u].ventas} ventas | $${usuarios[u].total}</p>`;

    }

    document.getElementById("resumen").innerHTML+=html;

}

// ===============================
// INICIAR
// ===============================

init();
function mostrarEgresos() {

    let total = 0;

    let html = `
        <hr>
        <h2>💸 EGRESOS DE CAJA</h2>
    `;

    if (egresos.length === 0) {
        html += "<p>No hay egresos registrados.</p>";
    }

    egresos.forEach(e => {

        total += e.monto;

        html += `
            <div style="border:1px solid #ccc;padding:10px;margin:10px;border-radius:8px;">
                <p>🏢 <b>${e.proveedor}</b></p>
                <p>📝 ${e.motivo}</p>
                <p>💵 $${e.monto}</p>
                <p>👤 ${e.usuario}</p>
                <p>📅 ${e.fecha} ${e.hora}</p>
            </div>
        `;
    });

    html += `
        <h3>💸 Total de egresos: $${total}</h3>
    `;

    document.getElementById("resumen").innerHTML += html;
}