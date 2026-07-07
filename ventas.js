```javascript
import { supabase } from './supabase.js'


// ===============================
// VENTAS
// ===============================

let productos = [];
let carrito = [];
let total = 0;


// Cargar productos al iniciar
cargarProductos();


// ===============================
// CARGAR PRODUCTOS SUPABASE
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


    console.log("PRODUCTOS DESDE SUPABASE:", productos);

}



// ===============================
// BUSCAR PRODUCTO
// ===============================

window.buscarProducto = function() {


    const codigo = document
        .getElementById("codigo")
        .value
        .trim();


    const producto = productos.find(
        p => String(p.codigo) === String(codigo)
    );


    if (!producto) {

        alert("Producto no encontrado.");
        return;

    }


    if (Number(producto.stock) <= 0) {

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

window.calcularVuelto = function() {


    const pagaCon = Number(
        document.getElementById("pagaCon").value
    );


    if (pagaCon < total) {

        alert("El dinero recibido es menor al total.");
        return;

    }


    document.getElementById("vuelto").textContent =
        pagaCon - total;


}



// ===============================
// FINALIZAR VENTA
// ===============================

window.finalizarVenta = async function() {


    if (carrito.length === 0) {

        alert("No hay productos en la venta.");
        return;

    }


    alert("Venta realizada correctamente");


    carrito = [];

    total = 0;


    actualizarVenta();


    document.getElementById("pagaCon").value = "";

    document.getElementById("vuelto").textContent = "0";


}




// ===============================
// ENTER BUSCAR
// ===============================

document
.getElementById("codigo")
.addEventListener("keypress", function(e){


    if(e.key === "Enter"){

        buscarProducto();

    }


});




// ===============================
// SCANNER CÁMARA
// ===============================

window.iniciarScanner = function(){


    const qr = new Html5Qrcode("reader");


    qr.start(

        {facingMode:"environment"},

        {
            fps:10,
            qrbox:250
        },


        (codigo)=>{


            buscarPorCodigo(codigo);


            qr.stop();


        }


    );


}




// ===============================
// BUSCAR POR SCANNER
// ===============================

function buscarPorCodigo(codigo){


    const producto = productos.find(
        p => String(p.codigo) === String(codigo)
    );



    if(!producto){

        alert("Producto no encontrado");
        return;

    }



    if(Number(producto.stock) <= 0){

        alert("Sin stock");
        return;

    }



    carrito.push({

        codigo:producto.codigo,
        nombre:producto.nombre,
        precio:producto.venta,
        cantidad:1

    });



    actualizarVenta();


}
```
