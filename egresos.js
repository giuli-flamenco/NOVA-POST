let egresos = JSON.parse(localStorage.getItem("egresos")) || [];

function guardarEgreso() {

    let proveedor = document.getElementById("proveedor").value.trim();
    let motivo = document.getElementById("motivo").value.trim();
    let monto = Number(document.getElementById("monto").value);

    if (!proveedor || !motivo || monto <= 0) {
        alert("Completá todos los datos.");
        return;
    }

    let usuario = localStorage.getItem("usuario") || "desconocido";

    let ahora = new Date();

    let fecha = ahora.toLocaleDateString();
    let hora = ahora.toLocaleTimeString();

    egresos.push({
        proveedor,
        motivo,
        monto,
        usuario,
        fecha,
        hora
    });

    localStorage.setItem("egresos", JSON.stringify(egresos));

    alert("✅ Egreso guardado correctamente.");

    document.getElementById("proveedor").value = "";
    document.getElementById("motivo").value = "";
    document.getElementById("monto").value = "";
}