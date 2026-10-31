function contarVisitas() {
    let visitas = Number(localStorage.getItem("visitas"));
    visitas = visitas + 1;
    localStorage.setItem("visitas", visitas);
    return visitas;
}

function mostrarSaludo(visitas) {
    let saludo = document.getElementById("saludo");

    if (visitas == 1) {
        saludo.textContent = "¡Bienvenido por primera vez!";
    } else {
        saludo.textContent = "Nos alegra verte de nuevo · Visita número " + visitas;
    }
}

mostrarSaludo(contarVisitas());
