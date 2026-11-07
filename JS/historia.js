// Este archivo está en Historia. Hace que cada año de la línea de tiempo se abra y se cierre.

// En vez de ponerle un evento a cada botón, hay uno solo en toda la lista (delegación).
// Cuando toco un botón, el clic "sube" hasta la lista y llega acá.
function abrirEvento(evento) {
    // evento.target es lo que toqué exactamente
    let boton = evento.target;

    // si toqué el año en negrita (strong), subo al botón que lo contiene
    if (boton.tagName != "BUTTON") {
        boton = boton.parentElement;
    }
    // si igual no es un botón (toqué otra parte de la lista), no hago nada
    if (boton.tagName != "BUTTON") {
        return;
    }

    // el li es el padre del botón. toggle pone la clase si no está y la saca si está.
    // el CSS muestra el texto del año solo cuando el li tiene la clase "abierto"
    const item = boton.parentElement;
    item.classList.toggle("abierto");

    // aria-expanded le avisa a los lectores de pantalla si está abierto o cerrado
    if (item.classList.contains("abierto")) {
        boton.setAttribute("aria-expanded", "true");
    } else {
        boton.setAttribute("aria-expanded", "false");
    }
}

// Conecto el clic de toda la lista con la función
document.getElementById("linea-tiempo").addEventListener("click", abrirEvento);
