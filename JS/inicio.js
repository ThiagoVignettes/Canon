// Suma una visita y la guarda
function contarVisitas() {
    let visitas = Number(localStorage.getItem("visitas"));
    visitas++;
    localStorage.setItem("visitas", visitas);
    return visitas;
}

// Muestra el saludo según las visitas
function mostrarSaludo(visitas) {
    const saludo = document.getElementById("saludo");

    if (visitas == 1) {
        saludo.textContent = "¡Bienvenido por primera vez!";
    } else {
        saludo.textContent = `Nos alegra verte de nuevo · Visita número ${visitas}`;
    }
}

mostrarSaludo(contarVisitas());
