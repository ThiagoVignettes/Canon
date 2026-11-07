// Abre o cierra un año de la línea de tiempo
function abrirEvento(evento) {
    let boton = evento.target;

    if (boton.tagName != "BUTTON") {
        boton = boton.parentElement;
    }
    if (boton.tagName != "BUTTON") {
        return;
    }

    const item = boton.parentElement;
    item.classList.toggle("abierto");

    if (item.classList.contains("abierto")) {
        boton.setAttribute("aria-expanded", "true");
    } else {
        boton.setAttribute("aria-expanded", "false");
    }
}

document.getElementById("linea-tiempo").addEventListener("click", abrirEvento);
