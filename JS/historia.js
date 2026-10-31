let preguntas = [
    {
        texto: "¿En qué año se construyó el prototipo Kwanon?",
        opciones: ["1924", "1934", "1947", "1976"],
        correcta: 1
    },
    {
        texto: "¿De dónde viene el nombre Kwanon?",
        opciones: ["De un río de Japón", "Del fundador de la empresa", "De Kannon, deidad budista", "De una palabra en inglés"],
        correcta: 2
    },
    {
        texto: "¿Qué tuvo de especial la Canon AE-1?",
        opciones: ["Fue la primera digital", "Tenía un microprocesador", "Era sumergible", "No tenía espejo"],
        correcta: 1
    },
    {
        texto: "¿Qué montura lanzó Canon con el sistema EOS en 1987?",
        opciones: ["FD", "RF", "EF", "M"],
        correcta: 2
    },
    {
        texto: "¿Qué tipo de cámara es la EOS R?",
        opciones: ["Mirrorless", "Compacta", "Réflex de película", "Instantánea"],
        correcta: 0
    }
];

let puntaje = 0;
let respondidas = 0;

function abrirEvento(evento) {
    let elemento = evento.target;

    if (elemento.tagName != "LI") {
        elemento = elemento.parentElement;
    }

    if (elemento.tagName == "LI") {
        elemento.classList.toggle("abierto");
    }
}

function crearPregunta(pregunta, numero) {
    let tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta pregunta";

    let titulo = document.createElement("h3");
    titulo.textContent = (numero + 1) + ". " + pregunta.texto;
    tarjeta.appendChild(titulo);

    for (let i = 0; i < pregunta.opciones.length; i++) {
        let boton = document.createElement("button");
        boton.type = "button";
        boton.className = "opcion";
        boton.textContent = pregunta.opciones[i];
        boton.addEventListener("click", () => {
            responder(tarjeta, numero, i);
        });
        tarjeta.appendChild(boton);
    }

    return tarjeta;
}

function responder(tarjeta, numero, elegida) {
    let botones = tarjeta.querySelectorAll(".opcion");
    let correcta = preguntas[numero].correcta;

    for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
    }

    if (elegida == correcta) {
        puntaje++;
        botones[elegida].classList.add("correcta");
    } else {
        botones[elegida].classList.add("incorrecta");
        botones[correcta].classList.add("correcta");
    }

    respondidas++;
    document.getElementById("puntaje").textContent = puntaje;

    if (respondidas == preguntas.length) {
        guardarMejorPuntaje();
    }
}

function guardarMejorPuntaje() {
    let mejor = Number(localStorage.getItem("mejorPuntaje"));

    if (puntaje > mejor) {
        localStorage.setItem("mejorPuntaje", puntaje);
    }

    mostrarMejorPuntaje();
}

function mostrarMejorPuntaje() {
    document.getElementById("mejor").textContent = Number(localStorage.getItem("mejorPuntaje"));
}

function armarQuiz() {
    let contenedor = document.getElementById("preguntas");
    contenedor.innerHTML = "";
    puntaje = 0;
    respondidas = 0;

    for (let i = 0; i < preguntas.length; i++) {
        contenedor.appendChild(crearPregunta(preguntas[i], i));
    }

    document.getElementById("puntaje").textContent = puntaje;
    document.getElementById("total").textContent = preguntas.length;
    mostrarMejorPuntaje();
}

document.getElementById("linea-tiempo").addEventListener("click", abrirEvento);
document.getElementById("btn-reiniciar").addEventListener("click", armarQuiz);

armarQuiz();
