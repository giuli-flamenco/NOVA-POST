
// =========================
// CREAR USUARIOS SIEMPRE
// =========================

let usuarios = [
    { usuario: "admin", password: "1234", rol: "admin" },
    { usuario: "leila", password: "1234", rol: "empleado" },
    { usuario: "usuario x", password: "1234", rol: "empleado" }
];

localStorage.setItem("usuarios", JSON.stringify(usuarios));


// =========================
// INGRESAR
// =========================

function ingresar() {

    let usuarioIngresado = document.getElementById("usuario").value.trim();
    let passwordIngresada = document.getElementById("password").value.trim();

    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    let encontrado = usuarios.find(u =>
        u.usuario === usuarioIngresado &&
        u.password === passwordIngresada
    );

    if (!encontrado) {
        alert("Usuario o contraseña incorrectos");
        return;
    }

    localStorage.setItem("usuario", encontrado.usuario);
    localStorage.setItem("rol", encontrado.rol);

    location.href = "index.html";
}