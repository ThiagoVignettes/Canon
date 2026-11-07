let miembros = [];

// Texto que aparece al elegir cada cámara
const descripciones = {
    "Canon AE-1": "1976 · La SLR que popularizó la fotografía réflex.",
    "Canon EOS 650": "1987 · La primera del sistema EOS con montura EF.",
    "Canon EOS 300D": "2003 · La DSLR que llevó lo digital a todos.",
    "Canon EOS 5D Mark II": "2008 · Full frame y video Full HD.",
    "Canon EOS R": "2018 · La primera mirrorless full frame de Canon."
};

function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = texto;
    mensaje.className = tipo;
}

// Devuelve la fecha de hoy como aaaa-mm-dd
function fechaDeHoy() {
    const hoy = new Date();
    let mes = hoy.getMonth() + 1;
    let dia = hoy.getDate();

    if (mes < 10) {
        mes = "0" + mes;
    }
    if (dia < 10) {
        dia = "0" + dia;
    }
    return `${hoy.getFullYear()}-${mes}-${dia}`;
}

// Pasa de aaaa-mm-dd a dd/mm/aaaa
function formatearFecha(fecha) {
    const partes = fecha.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// Validaciones
function validarNombre() {
    const campo = document.getElementById("nombre");

    if (campo.value.trim().length < 3) {
        campo.classList.add("campo-error");
        return false;
    }
    campo.classList.remove("campo-error");
    return true;
}

function validarEmail() {
    const campo = document.getElementById("email");
    const email = campo.value.trim();

    if (email.includes("@") == false || email.includes(".") == false) {
        campo.classList.add("campo-error");
        return false;
    }
    campo.classList.remove("campo-error");
    return true;
}

function yaEstaAnotado(email) {
    for (let i = 0; i < miembros.length; i++) {
        if (miembros[i].email == email) {
            return true;
        }
    }
    return false;
}

function validarFormulario() {
    if (validarNombre() == false) {
        mostrarMensaje("El nombre tiene que tener al menos 3 caracteres.", "error");
        return false;
    }
    if (validarEmail() == false) {
        mostrarMensaje("Ingresá un email válido, por ejemplo nombre@correo.com.", "error");
        return false;
    }
    if (document.getElementById("camara").value == "") {
        mostrarMensaje("Elegí tu cámara favorita.", "error");
        return false;
    }
    if (document.getElementById("fecha").value == "") {
        mostrarMensaje("Elegí la fecha de inscripción.", "error");
        return false;
    }
    if (document.getElementById("acepto").checked == false) {
        mostrarMensaje("Tenés que aceptar las condiciones para anotarte.", "error");
        return false;
    }
    if (yaEstaAnotado(document.getElementById("email").value.trim())) {
        mostrarMensaje("Ese email ya está anotado en el club.", "error");
        return false;
    }
    return true;
}

// Guardar y cargar con localStorage
function guardarMiembros() {
    localStorage.setItem("miembros", JSON.stringify(miembros));
}

function cargarMiembros() {
    const texto = localStorage.getItem("miembros");

    if (texto != null) {
        miembros = JSON.parse(texto);
    }
}

// Agrega un miembro nuevo
function registrar(evento) {
    evento.preventDefault();

    if (validarFormulario() == false) {
        return;
    }

    const miembro = {
        nombre: document.getElementById("nombre").value.trim(),
        email: document.getElementById("email").value.trim(),
        camara: document.getElementById("camara").value,
        fecha: document.getElementById("fecha").value
    };

    miembros.push(miembro);
    guardarMiembros();
    actualizarTabla();
    limpiarFormulario();
    mostrarMensaje(`¡Listo ${miembro.nombre}, ya sos parte del club!`, "ok");
}

// Borra un miembro (delegación de eventos)
function eliminarMiembro(evento) {
    if (evento.target.className != "borrar") {
        return;
    }

    const posicion = Number(evento.target.value);

    if (confirm(`¿Seguro que querés eliminar a ${miembros[posicion].nombre}?`)) {
        miembros.splice(posicion, 1);
        guardarMiembros();
        actualizarTabla();
        mostrarMensaje("Se eliminó el miembro.", "ok");
    }
}

function crearCelda(texto) {
    const celda = document.createElement("td");
    celda.textContent = texto;
    return celda;
}

// Vuelve a dibujar la tabla de miembros
function actualizarTabla() {
    const cuerpo = document.getElementById("cuerpo-miembros");
    cuerpo.innerHTML = "";

    for (let i = 0; i < miembros.length; i++) {
        const fila = document.createElement("tr");
        fila.appendChild(crearCelda(miembros[i].nombre));
        fila.appendChild(crearCelda(miembros[i].email));
        fila.appendChild(crearCelda(miembros[i].camara));
        fila.appendChild(crearCelda(formatearFecha(miembros[i].fecha)));

        const boton = document.createElement("button");
        boton.className = "borrar";
        boton.type = "button";
        boton.value = i;
        boton.textContent = "Eliminar";

        const celdaBoton = document.createElement("td");
        celdaBoton.appendChild(boton);
        fila.appendChild(celdaBoton);

        cuerpo.appendChild(fila);
    }

    actualizarResumen();
}

// Cuenta cuántos eligieron cada cámara
function actualizarResumen() {
    const resumen = document.getElementById("resumen");

    if (miembros.length == 0) {
        resumen.textContent = "Todavía no hay nadie anotado. ¡Sé el primero!";
        return;
    }

    let texto = `Total de miembros: ${miembros.length}.`;
    const opciones = document.getElementById("camara").options;

    for (let i = 1; i < opciones.length; i++) {
        let cantidad = 0;
        for (let j = 0; j < miembros.length; j++) {
            if (miembros[j].camara == opciones[i].value) {
                cantidad++;
            }
        }
        if (cantidad > 0) {
            texto = `${texto} ${opciones[i].value}: ${cantidad}.`;
        }
    }

    resumen.textContent = texto;
}

function limpiarFormulario() {
    document.getElementById("formulario").reset();
    document.getElementById("fecha").value = fechaDeHoy();
    document.getElementById("contador").textContent = "0 / 40 caracteres";
    document.getElementById("descripcion-camara").textContent = "";
    document.getElementById("nombre").classList.remove("campo-error");
    document.getElementById("email").classList.remove("campo-error");
}

function iniciar() {
    document.getElementById("fecha").value = fechaDeHoy();
    cargarMiembros();
    actualizarTabla();
}

// Resalta el campo que tiene el foco
const campos = document.querySelectorAll("input, select, textarea");

for (let i = 0; i < campos.length; i++) {
    campos[i].addEventListener("focus", () => {
        campos[i].classList.add("campo-activo");
    });
    campos[i].addEventListener("blur", () => {
        campos[i].classList.remove("campo-activo");
    });
}

// Contador de caracteres del nombre
document.getElementById("nombre").addEventListener("input", () => {
    const largo = document.getElementById("nombre").value.length;
    document.getElementById("contador").textContent = `${largo} / 40 caracteres`;
});

document.getElementById("nombre").addEventListener("blur", validarNombre);
document.getElementById("email").addEventListener("blur", validarEmail);

// Muestra la descripción de la cámara elegida
document.getElementById("camara").addEventListener("change", () => {
    const elegida = document.getElementById("camara").value;

    if (elegida == "") {
        document.getElementById("descripcion-camara").textContent = "";
    } else {
        document.getElementById("descripcion-camara").textContent = descripciones[elegida];
    }
});

document.getElementById("formulario").addEventListener("submit", registrar);
document.getElementById("btn-limpiar").addEventListener("click", () => {
    limpiarFormulario();
    mostrarMensaje("", "");
});
document.getElementById("cuerpo-miembros").addEventListener("click", eliminarMiembro);

document.addEventListener("keydown", (evento) => {
    if (evento.key == "Escape") {
        mostrarMensaje("", "");
    }
});

document.addEventListener("DOMContentLoaded", iniciar);
