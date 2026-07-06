// ===============================
// CLIENTES (FIADOS)
// ===============================

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

// ===============================
// GUARDAR CLIENTE
// ===============================

function agregarCliente() {

    let nombre = document.getElementById("nombre").value.trim();
    let deuda = Number(document.getElementById("deuda").value);

    if (!nombre) {
        alert("Ingresá un nombre");
        return;
    }

    clientes.push({
        nombre: nombre,
        deuda: deuda || 0
    });

    localStorage.setItem("clientes", JSON.stringify(clientes));

    mostrarClientes();

    document.getElementById("nombre").value = "";
    document.getElementById("deuda").value = "";
}

// ===============================
// MOSTRAR CLIENTES
// ===============================

function mostrarClientes() {

    let div = document.getElementById("lista");

    div.innerHTML = "";

    clientes.forEach((c, i) => {

        div.innerHTML += `
            <div style="border:1px solid #ccc; padding:10px; margin:10px;">
                <h3>👤 ${c.nombre}</h3>
                <p>💰 Debe: $${c.deuda}</p>

                <input type="number" placeholder="Sumar fiado" id="f${i}">
                <button onclick="sumarDeuda(${i})">➕ Agregar deuda</button>

                <button onclick="pagar(${i})">💵 Pago total</button>
            </div>
        `;
    });
}

// ===============================
// SUMAR DEUDA
// ===============================

function sumarDeuda(i) {

    let monto = Number(document.getElementById("f" + i).value);

    if (!monto || monto <= 0) return;

    clientes[i].deuda += monto;

    localStorage.setItem("clientes", JSON.stringify(clientes));

    mostrarClientes();
}

// ===============================
// PAGAR DEUDA
// ===============================

function pagar(i) {

    clientes[i].deuda = 0;

    localStorage.setItem("clientes", JSON.stringify(clientes));

    mostrarClientes();
}

// ===============================

mostrarClientes();