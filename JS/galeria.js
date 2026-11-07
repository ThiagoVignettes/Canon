// Este archivo está en Galería. Muestra las fotos en grande cuando las toco.

// querySelectorAll trae todas las fotos (es una lista que recorro con for)
const fotos = document.querySelectorAll(".foto");
// el visor es el fondo negro que tapa toda la pantalla
const visor = document.getElementById("visor");

// Copia la foto que toqué y su texto al visor, y lo muestra
function abrirVisor(foto) {
    const imagen = foto.querySelector("img");
    const texto = foto.querySelector("figcaption");

    document.getElementById("visor-img").src = imagen.src;
    document.getElementById("visor-img").alt = imagen.alt;
    document.getElementById("visor-texto").textContent = texto.textContent;
    // con la clase "visible" el CSS muestra el visor
    visor.classList.add("visible");
}

// Esconde el visor sacándole la clase
function cerrarVisor() {
    visor.classList.remove("visible");
}

// A cada foto le pongo 3 eventos
for (let i = 0; i < fotos.length; i++) {
    // pointerenter: el mouse entra a la foto y se agranda un poco
    fotos[i].addEventListener("pointerenter", () => {
        fotos[i].classList.add("destacada");
    });
    // pointerleave: el mouse sale y vuelve a su tamaño
    fotos[i].addEventListener("pointerleave", () => {
        fotos[i].classList.remove("destacada");
    });
    // clic en la foto: se abre el visor
    fotos[i].querySelector(".abrir-foto").addEventListener("click", () => {
        abrirVisor(fotos[i]);
    });
}

// si toco el fondo negro, se cierra
visor.addEventListener("click", cerrarVisor);

// La foto grande está adentro del visor. Sin esto, tocar la foto también lo cerraría
// porque el clic "sube" hasta el visor. stopPropagation frena ese clic acá.
document.getElementById("visor-caja").addEventListener("click", (evento) => {
    evento.stopPropagation();
});

// con la tecla Escape también se cierra
document.addEventListener("keydown", (evento) => {
    if (evento.key == "Escape") {
        cerrarVisor();
    }
});
