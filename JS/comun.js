// Pone el tema guardado y cambia el texto del botón
function aplicarTema() {
    const tema = localStorage.getItem("tema");
    const boton = document.getElementById("btn-tema");

    if (tema == "oscuro") {
        document.body.classList.add("oscuro");
        boton.textContent = "☀ Modo claro";
    } else {
        document.body.classList.remove("oscuro");
        boton.textContent = "☾ Modo oscuro";
    }
}

// Alterna entre claro y oscuro y lo guarda
function cambiarTema() {
    if (localStorage.getItem("tema") == "oscuro") {
        localStorage.setItem("tema", "claro");
    } else {
        localStorage.setItem("tema", "oscuro");
    }
    aplicarTema();
}

aplicarTema();
document.getElementById("btn-tema").addEventListener("click", cambiarTema);
