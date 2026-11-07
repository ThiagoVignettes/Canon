// Este archivo está en las 10 páginas. Se encarga del botón de modo claro / oscuro.

// Se fija qué tema quedó guardado y lo aplica.
// Si es "oscuro", le pone la clase "oscuro" al body y el CSS cambia los colores.
function aplicarTema() {
    // localStorage guarda datos en el navegador aunque se cierre la página
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

// Se ejecuta al tocar el botón: guarda el tema contrario al que había
// y después llama a aplicarTema() para que se vea el cambio.
function cambiarTema() {
    if (localStorage.getItem("tema") == "oscuro") {
        localStorage.setItem("tema", "claro");
    } else {
        localStorage.setItem("tema", "oscuro");
    }
    aplicarTema();
}

// Apenas carga la página, pongo el tema que estaba guardado
aplicarTema();

// Conecto el clic del botón con la función (se pasa sin paréntesis para que espere el clic)
document.getElementById("btn-tema").addEventListener("click", cambiarTema);
