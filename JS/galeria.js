const fotos = document.querySelectorAll(".foto");
const visor = document.getElementById("visor");

// Muestra la foto elegida en grande
function abrirVisor(foto) {
    const imagen = foto.querySelector("img");
    const texto = foto.querySelector("figcaption");

    document.getElementById("visor-img").src = imagen.src;
    document.getElementById("visor-img").alt = imagen.alt;
    document.getElementById("visor-texto").textContent = texto.textContent;
    visor.classList.add("visible");
}

function cerrarVisor() {
    visor.classList.remove("visible");
}

// Eventos de cada foto
for (let i = 0; i < fotos.length; i++) {
    fotos[i].addEventListener("pointerenter", () => {
        fotos[i].classList.add("destacada");
    });
    fotos[i].addEventListener("pointerleave", () => {
        fotos[i].classList.remove("destacada");
    });
    fotos[i].querySelector(".abrir-foto").addEventListener("click", () => {
        abrirVisor(fotos[i]);
    });
}

visor.addEventListener("click", cerrarVisor);

// Evita que se cierre al tocar la foto
document.getElementById("visor-caja").addEventListener("click", (evento) => {
    evento.stopPropagation();
});

document.addEventListener("keydown", (evento) => {
    if (evento.key == "Escape") {
        cerrarVisor();
    }
});
