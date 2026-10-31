function aplicarTema() {
    let tema = localStorage.getItem("tema");
    let boton = document.getElementById("btn-tema");

    if (tema == "oscuro") {
        document.body.classList.add("oscuro");
        boton.textContent = "☀ Modo claro";
    } else {
        document.body.classList.remove("oscuro");
        boton.textContent = "☾ Modo oscuro";
    }
}

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
