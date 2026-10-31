let fotos = document.querySelectorAll(".foto");
let visor = document.getElementById("visor");

function abrirVisor(foto) {
    let imagen = foto.querySelector("img");
    let texto = foto.querySelector("figcaption");

    document.getElementById("visor-img").src = imagen.src;
    document.getElementById("visor-img").alt = imagen.alt;
    document.getElementById("visor-texto").textContent = texto.textContent;
    visor.classList.add("visible");
}

function cerrarVisor() {
    visor.classList.remove("visible");
}

for (let i = 0; i < fotos.length; i++) {
    fotos[i].addEventListener("pointerenter", () => {
        fotos[i].classList.add("destacada");
    });
    fotos[i].addEventListener("pointerleave", () => {
        fotos[i].classList.remove("destacada");
    });
    fotos[i].addEventListener("click", () => {
        abrirVisor(fotos[i]);
    });
}

visor.addEventListener("click", cerrarVisor);

document.getElementById("visor-caja").addEventListener("click", (evento) => {
    evento.stopPropagation();
});

document.addEventListener("keydown", (evento) => {
    if (evento.key == "Escape") {
        cerrarVisor();
    }
});
