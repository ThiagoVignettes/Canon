// Este archivo está en Club. Maneja el formulario de inscripción y la tabla de miembros.

// Acá guardo a todos los miembros (arreglo de objetos). Arranca vacío.
let miembros = [];

// Objeto con un texto para cada cámara. Se muestra al elegirla en la lista.
const descripciones = {
    "Canon AE-1": "1976 · La SLR que popularizó la fotografía réflex.",
    "Canon EOS 650": "1987 · La primera del sistema EOS con montura EF.",
    "Canon EOS 300D": "2003 · La DSLR que llevó lo digital a todos.",
    "Canon EOS 5D Mark II": "2008 · Full frame y video Full HD.",
    "Canon EOS R": "2018 · La primera mirrorless full frame de Canon."
};

// Muestra un mensaje abajo del formulario.
// tipo puede ser "error" (se ve en rojo) u "ok" (se ve en verde).
function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = texto;
    mensaje.className = tipo;
}

// Devuelve la fecha de hoy como aaaa-mm-dd, que es lo que pide el input de fecha.
// Si el mes o el día tienen un solo número, le agrego un 0 adelante (7 pasa a 07).
function fechaDeHoy() {
    const hoy = new Date();
    // getMonth empieza en 0 (enero = 0), por eso le sumo 1
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

// Pasa la fecha de 2026-11-07 a 07/11/2026 para mostrarla en la tabla.
// split("-") corta el texto en cada guion y me da un arreglo con las 3 partes.
function formatearFecha(fecha) {
    const partes = fecha.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// VALIDACIONES: cada una devuelve true si está bien y false si está mal

// El nombre tiene que tener al menos 3 letras. trim() saca los espacios de los costados.
// Si está mal, le pongo la clase "campo-error" para que se pinte de rojo.
function validarNombre() {
    const campo = document.getElementById("nombre");

    if (campo.value.trim().length < 3) {
        campo.classList.add("campo-error");
        return false;
    }
    campo.classList.remove("campo-error");
    return true;
}

// El email tiene que tener un @ y un punto (es una validación simple)
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

// Recorre los miembros y se fija si ese email ya está anotado
function yaEstaAnotado(email) {
    for (let i = 0; i < miembros.length; i++) {
        if (miembros[i].email == email) {
            return true;
        }
    }
    return false;
}

// Revisa todo el formulario en orden. Apenas encuentra un error,
// muestra el mensaje y devuelve false (el return corta la función ahí).
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
    // checked es true si la casilla está tildada
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

// GUARDAR Y CARGAR
// localStorage solo guarda texto, por eso uso JSON:
// JSON.stringify pasa el arreglo a texto y JSON.parse lo vuelve a pasar a arreglo.

function guardarMiembros() {
    localStorage.setItem("miembros", JSON.stringify(miembros));
}

// Si no hay nada guardado, getItem devuelve null y dejo el arreglo vacío
function cargarMiembros() {
    const texto = localStorage.getItem("miembros");

    if (texto != null) {
        miembros = JSON.parse(texto);
    }
}

// Se ejecuta cuando aprieto "Anotarme" (evento submit del formulario)
function registrar(evento) {
    // preventDefault evita que el formulario recargue la página
    evento.preventDefault();

    // si algo está mal, corto acá y no agrego nada
    if (validarFormulario() == false) {
        return;
    }

    // armo un objeto con los datos del formulario
    const miembro = {
        nombre: document.getElementById("nombre").value.trim(),
        email: document.getElementById("email").value.trim(),
        camara: document.getElementById("camara").value,
        fecha: document.getElementById("fecha").value
    };

    // push lo agrega al final del arreglo
    miembros.push(miembro);
    guardarMiembros();
    actualizarTabla();
    limpiarFormulario();
    mostrarMensaje(`¡Listo ${miembro.nombre}, ya sos parte del club!`, "ok");
}

// Borra un miembro. Los botones "Eliminar" se crean después de cargar la página,
// así que pongo un solo evento en toda la tabla (delegación) y me fijo qué se tocó.
function eliminarMiembro(evento) {
    // si lo que toqué no es un botón "borrar", no hago nada
    if (evento.target.className != "borrar") {
        return;
    }

    // cada botón tiene guardada en su value la posición del miembro en el arreglo
    const posicion = Number(evento.target.value);

    // confirm muestra una ventanita con Aceptar y Cancelar
    if (confirm(`¿Seguro que querés eliminar a ${miembros[posicion].nombre}?`)) {
        // splice saca 1 elemento desde esa posición
        miembros.splice(posicion, 1);
        guardarMiembros();
        actualizarTabla();
        mostrarMensaje("Se eliminó el miembro.", "ok");
    }
}

// Crea una celda (td) con el texto que le paso.
// Uso textContent para que lo que escribe el usuario se muestre como texto y no como HTML.
function crearCelda(texto) {
    const celda = document.createElement("td");
    celda.textContent = texto;
    return celda;
}

// Borra la tabla y la vuelve a armar con todos los miembros del arreglo
function actualizarTabla() {
    const cuerpo = document.getElementById("cuerpo-miembros");
    cuerpo.innerHTML = "";

    for (let i = 0; i < miembros.length; i++) {
        const fila = document.createElement("tr");
        fila.appendChild(crearCelda(miembros[i].nombre));
        fila.appendChild(crearCelda(miembros[i].email));
        fila.appendChild(crearCelda(miembros[i].camara));
        fila.appendChild(crearCelda(formatearFecha(miembros[i].fecha)));

        // botón "Eliminar" de esa fila. En value le guardo la posición (i)
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

// Escribe abajo de la tabla cuántos miembros hay y cuántos eligieron cada cámara
function actualizarResumen() {
    const resumen = document.getElementById("resumen");

    if (miembros.length == 0) {
        resumen.textContent = "Todavía no hay nadie anotado. ¡Sé el primero!";
        return;
    }

    let texto = `Total de miembros: ${miembros.length}.`;
    // tomo las opciones de la lista de cámaras (empiezo en 1 para saltear "Elegí una opción")
    const opciones = document.getElementById("camara").options;

    // por cada cámara, cuento cuántos miembros la eligieron (un for adentro de otro)
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

// Deja el formulario vacío como al principio (reset borra todos los campos)
function limpiarFormulario() {
    document.getElementById("formulario").reset();
    document.getElementById("fecha").value = fechaDeHoy();
    document.getElementById("contador").textContent = "0 / 40 caracteres";
    document.getElementById("descripcion-camara").textContent = "";
    document.getElementById("nombre").classList.remove("campo-error");
    document.getElementById("email").classList.remove("campo-error");
}

// Lo que pasa cuando se abre la página: pongo la fecha de hoy,
// traigo los miembros guardados y dibujo la tabla
function iniciar() {
    document.getElementById("fecha").value = fechaDeHoy();
    cargarMiembros();
    actualizarTabla();
}

// EVENTOS

// focus: cuando entro a un campo se resalta. blur: cuando salgo, vuelve a la normalidad.
const campos = document.querySelectorAll("input, select, textarea");

for (let i = 0; i < campos.length; i++) {
    campos[i].addEventListener("focus", () => {
        campos[i].classList.add("campo-activo");
    });
    campos[i].addEventListener("blur", () => {
        campos[i].classList.remove("campo-activo");
    });
}

// input: con cada letra que escribo en el nombre, actualizo el contador
document.getElementById("nombre").addEventListener("input", () => {
    const largo = document.getElementById("nombre").value.length;
    document.getElementById("contador").textContent = `${largo} / 40 caracteres`;
});

// blur: al salir del nombre o del email, los valido
document.getElementById("nombre").addEventListener("blur", validarNombre);
document.getElementById("email").addEventListener("blur", validarEmail);

// change: al elegir una cámara muestro su descripción
document.getElementById("camara").addEventListener("change", () => {
    const elegida = document.getElementById("camara").value;

    if (elegida == "") {
        document.getElementById("descripcion-camara").textContent = "";
    } else {
        document.getElementById("descripcion-camara").textContent = descripciones[elegida];
    }
});

// submit: cuando envío el formulario
document.getElementById("formulario").addEventListener("submit", registrar);
// botón Limpiar
document.getElementById("btn-limpiar").addEventListener("click", () => {
    limpiarFormulario();
    mostrarMensaje("", "");
});
// un solo evento en toda la tabla para todos los botones Eliminar (delegación)
document.getElementById("cuerpo-miembros").addEventListener("click", eliminarMiembro);

// Escape borra los mensajes
document.addEventListener("keydown", (evento) => {
    if (evento.key == "Escape") {
        mostrarMensaje("", "");
    }
});

// cuando termina de cargar la página, arranco
document.addEventListener("DOMContentLoaded", iniciar);
