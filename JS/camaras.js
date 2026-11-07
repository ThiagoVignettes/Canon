// Este archivo está en Cámaras. Arma la tabla con JavaScript y deja buscar, filtrar y ordenar.

// Arreglo de objetos: cada objeto es una cámara con sus datos.
// La tabla del HTML está vacía y se llena con esto.
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

// Guarda hacia dónde ordené por año la última vez (para alternar)
let ordenAscendente = false;

// Me dice si una cámara se tiene que mostrar o no.
// Devuelve true si coincide con lo que escribí en el buscador y con el tipo elegido.
function cumpleFiltros(camara) {
    // paso todo a minúsculas para que "eos" y "EOS" den lo mismo
    const texto = document.getElementById("buscar").value.toLowerCase();
    const tipo = document.getElementById("filtro-tipo").value;

    // includes se fija si el texto está adentro del nombre del modelo
    if (camara.modelo.toLowerCase().includes(texto) == false) {
        return false;
    }
    if (tipo != "Todos" && camara.tipo != tipo) {
        return false;
    }
    return true;
}

// Crea una celda (td) con el texto que le paso y la devuelve
function crearCelda(texto) {
    const celda = document.createElement("td");
    celda.textContent = texto;
    return celda;
}

// Crea una fila (tr) con los 5 datos de la cámara y le pone sus eventos
function crearFila(camara) {
    const fila = document.createElement("tr");
    // tabIndex = 0 hace que se pueda llegar a la fila con la tecla Tab
    fila.tabIndex = 0;

    fila.appendChild(crearCelda(camara.modelo));
    fila.appendChild(crearCelda(camara.anio));
    fila.appendChild(crearCelda(camara.tipo));
    fila.appendChild(crearCelda(camara.montura));
    fila.appendChild(crearCelda(camara.formato));

    // al pasar el mouse la fila se pinta, y al salir vuelve a la normalidad
    fila.addEventListener("mouseover", () => {
        fila.classList.add("resaltada");
    });
    fila.addEventListener("mouseout", () => {
        fila.classList.remove("resaltada");
    });
    // con clic o con Enter se muestra la ficha de esa cámara
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

// Borra la tabla y la vuelve a armar solo con las cámaras que pasan los filtros.
// Se llama al cargar la página y cada vez que busco, filtro u ordeno.
function actualizarTabla() {
    const cuerpo = document.getElementById("cuerpo-tabla");
    let cantidad = 0;
    // vacío la tabla para no repetir filas
    cuerpo.innerHTML = "";

    // recorro todas las cámaras y agrego solo las que cumplen
    for (let i = 0; i < camaras.length; i++) {
        if (cumpleFiltros(camaras[i])) {
            cuerpo.appendChild(crearFila(camaras[i]));
            cantidad++;
        }
    }

    // muestro cuántas quedaron
    if (cantidad == 0) {
        document.getElementById("cantidad").textContent = "No se encontró ningún modelo.";
    } else {
        document.getElementById("cantidad").textContent = `Mostrando ${cantidad} de ${camaras.length} modelos.`;
    }
}

// Muestra abajo de la tabla el nombre, el año y la descripción de la cámara
function mostrarFicha(camara) {
    document.getElementById("ficha-titulo").textContent = `${camara.modelo} (${camara.anio})`;
    document.getElementById("ficha-texto").textContent = camara.descripcion;
    // la clase "visible" hace que el CSS muestre la ficha
    document.getElementById("ficha").classList.add("visible");
}

// Estas dos funciones le dicen a sort() cómo ordenar (son callbacks).
// Si devuelven un número negativo, "a" va primero; si es positivo, va "b".

// Ordena por año, de más vieja a más nueva o al revés
function compararPorAnio(a, b) {
    if (ordenAscendente) {
        return a.anio - b.anio;
    }
    return b.anio - a.anio;
}

// Ordena por nombre, alfabéticamente
function compararPorModelo(a, b) {
    if (a.modelo < b.modelo) {
        return -1;
    }
    if (a.modelo > b.modelo) {
        return 1;
    }
    return 0;
}

// Se fija qué título toqué (Modelo o Año) mirando su id, ordena y vuelve a dibujar
function ordenarTabla(evento) {
    if (evento.target.id == "orden-anio") {
        camaras.sort(compararPorAnio);
        // la próxima vez ordena al revés
        ordenAscendente = !ordenAscendente;
    } else if (evento.target.id == "orden-modelo") {
        camaras.sort(compararPorModelo);
    }
    actualizarTabla();
}

// Si aprieto Escape, borro la búsqueda, vuelvo el filtro a "Todos" y escondo la ficha
function limpiarConEscape(evento) {
    if (evento.key == "Escape") {
        document.getElementById("buscar").value = "";
        document.getElementById("filtro-tipo").value = "Todos";
        document.getElementById("ficha").classList.remove("visible");
        actualizarTabla();
    }
}

// Eventos
// cuando termina de cargar la página, dibujo la tabla
document.addEventListener("DOMContentLoaded", actualizarTabla);
// input: se ejecuta con cada letra que escribo en el buscador
document.getElementById("buscar").addEventListener("input", actualizarTabla);
// change: se ejecuta cuando elijo otro tipo en la lista
document.getElementById("filtro-tipo").addEventListener("change", actualizarTabla);
// un solo evento para los dos botones de los títulos
document.getElementById("titulos").addEventListener("click", ordenarTabla);
document.addEventListener("keydown", limpiarConEscape);
// preventDefault evita que Enter en el buscador recargue la página
document.getElementById("filtros").addEventListener("submit", (evento) => {
    evento.preventDefault();
});
