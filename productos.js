import { supabase } from './supabase.js';

alert("NOVA POST PRODUCTOS CONECTADO A SUPABASE");

let productos = [];


// ===============================
// CARGAR PRODUCTOS
// ===============================

cargarProductos();


async function cargarProductos() {

    const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("id", { ascending: false });


    if (error) {

        console.error("Error cargando productos:", error);
        alert("Error conectando con productos");

        return;
    }


    productos = data || [];

    mostrarProductos();

}



// ===============================
// GUARDAR PRODUCTO
// ===============================

async function guardarProducto() {


    const codigo = document.getElementById("codigo").value.trim();
    const nombre = document.getElementById("nombre").value.trim();

    const costo = Number(
        document.getElementById("precioCompra").value
    );

    const venta = Number(
        document.getElementById("precioVenta").value
    );

    const stock = Number(
        document.getElementById("stock").value
    );



    if (
        codigo === "" ||
        nombre === "" ||
        costo <= 0 ||
        venta <= 0 ||
        stock < 0
    ) {

        alert("Complete todos los datos");
        return;

    }



    const { error } = await supabase
        .from("productos")
        .insert([
            {
                codigo,
                nombre,
                costo,
                venta,
                stock
            }
        ]);



    if (error) {

        console.error("Error guardando:", error);
        alert("No se pudo guardar el producto");

        return;
    }



    alert("Producto guardado correctamente");


    limpiar();

    cargarProductos();

}



// Permitir botón HTML

window.guardarProducto = guardarProducto;




// ===============================
// MOSTRAR PRODUCTOS
// ===============================

function mostrarProductos() {


    const tabla = document.getElementById("tablaProductos");


    if (!tabla) return;



    tabla.innerHTML = "";



    productos.forEach((p)=>{


        tabla.innerHTML += `

        <tr>

            <td>${p.codigo}</td>

            <td>${p.nombre}</td>

            <td>$${p.costo}</td>

            <td>$${p.venta}</td>

            <td>${p.stock ?? 0}</td>

            <td>${p.stock ?? 0}</td>

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


async function eliminarProducto(id){


    if(!confirm("¿Eliminar producto?")) return;



    const { error } = await supabase
        .from("productos")
        .delete()
        .eq("id", id);



    if(error){

        console.error(error);
        alert("No se pudo eliminar");

        return;
    }


    cargarProductos();


}



window.eliminarProducto = eliminarProducto;




// ===============================
// LIMPIAR CAMPOS
// ===============================

function limpiar(){


    document.getElementById("codigo").value="";
    document.getElementById("nombre").value="";
    document.getElementById("precioCompra").value="";
    document.getElementById("precioVenta").value="";
    document.getElementById("stock").value="";


}