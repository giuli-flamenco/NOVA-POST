import { supabase } from './supabase.js'

window.logout = function () {
  localStorage.removeItem("usuario")
  localStorage.removeItem("rol")
  window.location.href = "login.html"
}

async function probarConexion() {
  const { data, error } = await supabase
    .from("productos")
    .select("*")

  if (error) {
    console.error("Error:", error)
  } else {
    console.log("Productos:", data)
  }
}

probarConexion()