// Suma una visita, la guarda y la muestra
function contarVisitas() {
    let visitas = Number(localStorage.getItem("visitas"));
    visitas++;
    localStorage.setItem("visitas", visitas);
    document.getElementById("visitas").textContent = visitas;
}

contarVisitas();
