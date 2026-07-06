import { supabase } from './supabase.js'

alert("ESTE ES EL PRODUCTOS JS NUEVO");


// ===============================
// PRODUCTOS
// ===============================

let productos = [];


// Cargar productos al abrir
cargarProductos();


// ===============================
// CARGAR PRODUCTOS DESDE SUPABASE
// ===============================

async function cargarProductos() {

    const { data, error } = await supabase
        .from("productos")
        .select("*");

    if (error) {

        console.error("Error cargando productos:", error);
        return;

    }

    productos = data || [];

    mostrarProductos();

}


// ===============================
// GUARDAR PRODUCTO
// ===============================

async function guardarProducto() {

    alert("Entró a guardarProducto");


    const codigo = document.getElementById("codigo").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const costo = Number(document.getElementById("precioCompra").value);
    const venta = Number(document.getElementById("precioVenta").value);


    if (codigo === "" || nombre === "" || costo <= 0 || venta <= 0) {

        alert("Complete todos los datos.");
        return;

    }


    const { error } = await supabase
        .from("productos")
        .insert([
            {
                codigo: codigo,
                nombre: nombre,
                costo: costo,
                venta: venta
            }
        ]);


    if (error) {

        console.error("Error guardando producto:", error);
        alert("Error al guardar producto");
        return;

    }


    alert("Producto guardado correctamente");


    limpiar();

    cargarProductos();

}


// Hacer visible el botón del HTML

window.guardarProducto = guardarProducto;



// ===============================
// MOSTRAR PRODUCTOS
// ===============================

function mostrarProductos() {


    const tabla = document.getElementById("tablaProductos");


    if (!tabla) return;


    tabla.innerHTML = "";


    productos.forEach((p) => {


        tabla.innerHTML += `

        <tr>

            <td>${p.codigo}</td>

            <td>${p.nombre}</td>

            <td>$${p.costo}</td>

            <td>$${p.venta}</td>


            <td>

                <button onclick="eliminarProducto(${p.id})">

                    🗑️

                </button>

            </td>


        </tr>

        `;


    });


}



// ===============================
// ELIMINAR PRODUCTO
// ===============================

async function eliminarProducto(id) {


    if (confirm("¿Eliminar producto?")) {


        const { error } = await supabase
            .from("productos")
            .delete()
            .eq("id", id);



        if (error) {

            console.error("Error eliminando:", error);
            return;

        }


        cargarProductos();


    }

}


// Hacer visible el botón eliminar

window.eliminarProducto = eliminarProducto;



// ===============================
// LIMPIAR
// ===============================

function limpiar() {


    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("precioCompra").value = "";
    document.getElementById("precioVenta").value = "";


}