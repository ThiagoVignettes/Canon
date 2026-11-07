// Este archivo está solo en el inicio. Cuenta cuántas veces se entró a la página.

// Lee el número de visitas guardado, le suma 1, lo vuelve a guardar y lo muestra.
// La primera vez no hay nada guardado, y Number(null) da 0, así que arranca de 0.
function contarVisitas() {
    // uso Number() porque localStorage guarda todo como texto
    let visitas = Number(localStorage.getItem("visitas"));
    visitas++;
    localStorage.setItem("visitas", visitas);
    // escribo el número adentro del span que dice "0" en el HTML
    document.getElementById("visitas").textContent = visitas;
}

// La llamo una vez cuando se abre la página
contarVisitas();
