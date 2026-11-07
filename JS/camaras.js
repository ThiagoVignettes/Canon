// Datos de las cámaras
const camaras = [
    { modelo: "Canon F-1", anio: 1971, tipo: "SLR", montura: "FD", formato: "35 mm (película)", descripcion: "La primera réflex profesional de Canon. Era muy resistente y aceptaba muchos accesorios." },
    { modelo: "Canon AE-1", anio: 1976, tipo: "SLR", montura: "FD", formato: "35 mm (película)", descripcion: "La primera SLR con microprocesador. Se vendieron millones y fue la cámara de muchos aficionados." },
    { modelo: "Canon EOS 650", anio: 1987, tipo: "SLR", montura: "EF", formato: "35 mm (película)", descripcion: "La primera cámara del sistema EOS, con enfoque automático y la nueva montura electrónica EF." },
    { modelo: "Canon EOS-1D", anio: 2001, tipo: "DSLR", montura: "EF", formato: "APS-H (digital)", descripcion: "Réflex digital profesional pensada para fotoperiodismo y deportes." },
    { modelo: "Canon EOS 300D", anio: 2003, tipo: "DSLR", montura: "EF", formato: "APS-C (digital)", descripcion: "Con 6,3 megapíxeles, fue la primera DSLR de menos de mil dólares con objetivo incluido." },
    { modelo: "Canon EOS 5D", anio: 2005, tipo: "DSLR", montura: "EF", formato: "Full frame (digital)", descripcion: "Llevó el sensor full frame a un cuerpo más chico y accesible que las cámaras profesionales." },
    { modelo: "Canon EOS 5D Mark II", anio: 2008, tipo: "DSLR", montura: "EF", formato: "Full frame (digital)", descripcion: "Grababa video Full HD y terminó usándose en series, publicidades y hasta películas." },
    { modelo: "Canon EOS R", anio: 2018, tipo: "Mirrorless", montura: "RF", formato: "Full frame (digital)", descripcion: "La primera mirrorless full frame de Canon, que estrenó la montura RF." },
    { modelo: "Canon EOS R5", anio: 2020, tipo: "Mirrorless", montura: "RF", formato: "Full frame (digital)", descripcion: "45 megapíxeles y video 8K. Una de las cámaras más completas de la marca." }
];

let ordenAscendente = false;

// Revisa si la cámara pasa la búsqueda y el filtro
function cumpleFiltros(camara) {
    const texto = document.getElementById("buscar").value.toLowerCase();
    const tipo = document.getElementById("filtro-tipo").value;

    if (camara.modelo.toLowerCase().includes(texto) == false) {
        return false;
    }
    if (tipo != "Todos" && camara.tipo != tipo) {
        return false;
    }
    return true;
}

function crearCelda(texto) {
    const celda = document.createElement("td");
    celda.textContent = texto;
    return celda;
}

// Arma una fila con sus eventos
function crearFila(camara) {
    const fila = document.createElement("tr");
    fila.tabIndex = 0;

    fila.appendChild(crearCelda(camara.modelo));
    fila.appendChild(crearCelda(camara.anio));
    fila.appendChild(crearCelda(camara.tipo));
    fila.appendChild(crearCelda(camara.montura));
    fila.appendChild(crearCelda(camara.formato));

    fila.addEventListener("mouseover", () => {
        fila.classList.add("resaltada");
    });
    fila.addEventListener("mouseout", () => {
        fila.classList.remove("resaltada");
    });
    fila.addEventListener("click", () => {
        mostrarFicha(camara);
    });
    fila.addEventListener("keydown", (evento) => {
        if (evento.key == "Enter") {
            mostrarFicha(camara);
        }
    });

    return fila;
}

// Vuelve a dibujar la tabla
function actualizarTabla() {
    const cuerpo = document.getElementById("cuerpo-tabla");
    let cantidad = 0;
    cuerpo.innerHTML = "";

    for (let i = 0; i < camaras.length; i++) {
        if (cumpleFiltros(camaras[i])) {
            cuerpo.appendChild(crearFila(camaras[i]));
            cantidad++;
        }
    }

    if (cantidad == 0) {
        document.getElementById("cantidad").textContent = "No se encontró ningún modelo.";
    } else {
        document.getElementById("cantidad").textContent = `Mostrando ${cantidad} de ${camaras.length} modelos.`;
    }
}

function mostrarFicha(camara) {
    document.getElementById("ficha-titulo").textContent = `${camara.modelo} (${camara.anio})`;
    document.getElementById("ficha-texto").textContent = camara.descripcion;
    document.getElementById("ficha").classList.add("visible");
}

// Funciones para ordenar
function compararPorAnio(a, b) {
    if (ordenAscendente) {
        return a.anio - b.anio;
    }
    return b.anio - a.anio;
}

function compararPorModelo(a, b) {
    if (a.modelo < b.modelo) {
        return -1;
    }
    if (a.modelo > b.modelo) {
        return 1;
    }
    return 0;
}

// Ordena según el botón tocado
function ordenarTabla(evento) {
    if (evento.target.id == "orden-anio") {
        camaras.sort(compararPorAnio);
        ordenAscendente = !ordenAscendente;
    } else if (evento.target.id == "orden-modelo") {
        camaras.sort(compararPorModelo);
    }
    actualizarTabla();
}

// Escape limpia la búsqueda
function limpiarConEscape(evento) {
    if (evento.key == "Escape") {
        document.getElementById("buscar").value = "";
        document.getElementById("filtro-tipo").value = "Todos";
        document.getElementById("ficha").classList.remove("visible");
        actualizarTabla();
    }
}

document.addEventListener("DOMContentLoaded", actualizarTabla);
document.getElementById("buscar").addEventListener("input", actualizarTabla);
document.getElementById("filtro-tipo").addEventListener("change", actualizarTabla);
document.getElementById("titulos").addEventListener("click", ordenarTabla);
document.addEventListener("keydown", limpiarConEscape);
document.getElementById("filtros").addEventListener("submit", (evento) => {
    evento.preventDefault();
});
