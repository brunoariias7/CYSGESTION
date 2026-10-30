// Este archivo contiene las interacciones básicas del sitio.

// 1. Menú de navegación para celulares.
const botonMenu = document.getElementById("botonMenu");
const navegacion = document.getElementById("navegacion");

if (botonMenu && navegacion) {
    botonMenu.addEventListener("click", function () {
        navegacion.classList.toggle("abierta");

        const menuAbierto = navegacion.classList.contains("abierta");
        botonMenu.setAttribute("aria-expanded", menuAbierto);

        if (menuAbierto) {
            botonMenu.textContent = "✕";
            botonMenu.setAttribute("aria-label", "Cerrar menú");
        } else {
            botonMenu.textContent = "☰";
            botonMenu.setAttribute("aria-label", "Abrir menú");
        }
    });
}

// 2. Resalta en el menú la página que se está visitando.
const enlacesMenu = document.querySelectorAll(".navegacion a");
const paginaActual = window.location.pathname.split("/").pop() || "index.html";

enlacesMenu.forEach(function (enlace) {
    const destino = enlace.getAttribute("href");

    if (destino === paginaActual) {
        enlace.classList.add("activo");
        enlace.setAttribute("aria-current", "page");
    } else {
        enlace.classList.remove("activo");
        enlace.removeAttribute("aria-current");
    }
});

// 3. Pestañas de estándares en la página Fundamentos.
const botonesPestana = document.querySelectorAll(".pestana");

botonesPestana.forEach(function (boton) {
    boton.addEventListener("click", function () {
        const idPanel = boton.getAttribute("data-panel");
        const panelSeleccionado = document.getElementById(idPanel);
        const paneles = document.querySelectorAll(".panel-pestana");

        paneles.forEach(function (panel) {
            panel.classList.add("oculto");
        });

        botonesPestana.forEach(function (otraPestana) {
            otraPestana.classList.remove("activa");
            otraPestana.setAttribute("aria-selected", "false");
        });

        if (panelSeleccionado) {
            panelSeleccionado.classList.remove("oculto");
        }

        boton.classList.add("activa");
        boton.setAttribute("aria-selected", "true");
    });
});

// 4. Tarjetas que muestran u ocultan información adicional.
const botonesDetalle = document.querySelectorAll(".boton-detalle");

botonesDetalle.forEach(function (boton) {
    boton.addEventListener("click", function () {
        const tarjeta = boton.closest(".tarjeta-interactiva");
        const detalle = tarjeta.querySelector(".detalle");
        const estaAbierto = !detalle.classList.contains("oculto");

        detalle.classList.toggle("oculto");
        boton.setAttribute("aria-expanded", !estaAbierto);

        if (estaAbierto) {
            boton.innerHTML = 'Ver detalle <span>＋</span>';
        } else {
            boton.innerHTML = 'Ocultar detalle <span>−</span>';
        }
    });
});

// 5. Filtros de herramientas por categoría.
const botonesFiltro = document.querySelectorAll(".filtro");
const tarjetasHerramienta = document.querySelectorAll(".herramienta");

botonesFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () {
        const categoriaElegida = boton.getAttribute("data-filtro");

        botonesFiltro.forEach(function (otroBoton) {
            otroBoton.classList.remove("activo");
        });
        boton.classList.add("activo");

        tarjetasHerramienta.forEach(function (tarjeta) {
            const categoriaTarjeta = tarjeta.getAttribute("data-categoria");

            if (categoriaElegida === "todas" || categoriaTarjeta === categoriaElegida) {
                tarjeta.classList.remove("oculto");
            } else {
                tarjeta.classList.add("oculto");
            }
        });
    });
});

// 6. La línea de tiempo usa desplazamiento suave desde los enlaces del sitio.
// Los pasos también resaltan cuando se seleccionan con ratón o teclado.
const etapas = document.querySelectorAll(".etapa");

etapas.forEach(function (etapa) {
    etapa.addEventListener("click", function () {
        etapa.focus();
    });
});


// 7. Navegacion entre los modelos tradicionales.
const enlacesModelos = document.querySelectorAll(".enlace-modelo");

enlacesModelos.forEach(function (enlace) {
    enlace.addEventListener("click", function (evento) {
        evento.preventDefault();

        const idDestino = enlace.getAttribute("href");
        const seccionDestino = document.querySelector(idDestino);

        if (seccionDestino) {
            seccionDestino.scrollIntoView({ behavior: "smooth" });
        }

        enlacesModelos.forEach(function (otroEnlace) {
            otroEnlace.classList.remove("activo");
        });

        enlace.classList.add("activo");
    });
});


// HISTORIA 7 Y 9: galeria para ampliar diagramas con raton o teclado.
const botonesGraficos = document.querySelectorAll(".grafico-ampliable");
const visorGrafico = document.getElementById("visorGrafico");
if (visorGrafico) {
    const cerrarVisor = document.getElementById("cerrarVisor");
    botonesGraficos.forEach(function (boton) {
        boton.addEventListener("click", function () {
            document.getElementById("tituloVisor").textContent = boton.getAttribute("data-titulo");
            document.getElementById("contenidoVisor").innerHTML = boton.innerHTML;
            visorGrafico.classList.add("abierto");
            visorGrafico.setAttribute("aria-hidden", "false");
            cerrarVisor.focus();
        });
    });
    function cerrarGaleria() {
        visorGrafico.classList.remove("abierto");
        visorGrafico.setAttribute("aria-hidden", "true");
        document.getElementById("contenidoVisor").innerHTML = "";
    }
    cerrarVisor.addEventListener("click", cerrarGaleria);
    visorGrafico.addEventListener("click", function (evento) {
        if (evento.target === visorGrafico) cerrarGaleria();
    });
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && visorGrafico.classList.contains("abierto")) cerrarGaleria();
    });
}

// HISTORIA 10: detalles de cada evento del Sprint.
const botonesEventos = document.querySelectorAll(".evento-sprint");
const detallesEventos = {
    planificacion: ["Planificación del Sprint", "El equipo define por qué el sprint es valioso, qué trabajo realizará y cómo lo organizará. Su resultado principal es un objetivo de sprint claro."],
    trabajo: ["Trabajo del Sprint", "Los desarrolladores realizan las tareas del Sprint Backlog y construyen un incremento que cumpla con la definición de terminado."],
    daily: ["Scrum diario", "Evento breve de hasta 15 minutos para inspeccionar el avance hacia el objetivo, coordinar el trabajo y adaptar el plan."],
    revision: ["Revisión del Sprint", "El equipo presenta y analiza el incremento con las partes interesadas, recoge comentarios y considera los próximos pasos."],
    retro: ["Retrospectiva del Sprint", "El equipo reflexiona sobre su forma de trabajar, identifica mejoras y acuerda acciones para el siguiente sprint."]
};
botonesEventos.forEach(function (boton) {
    boton.addEventListener("click", function () {
        botonesEventos.forEach(function (otro) { otro.classList.remove("activo"); });
        boton.classList.add("activo");
        const detalle = detallesEventos[boton.getAttribute("data-evento")];
        document.getElementById("detalleEvento").innerHTML = "<h3>" + detalle[0] + "</h3><p>" + detalle[1] + "</p>";
    });
});

// HISTORIA 18: tabla que cambia según las metodologías seleccionadas.
const checksMetodos = document.querySelectorAll(".metodo-check");
const datosMetodos = {
    "Cascada": ["Etapas secuenciales", "Baja", "Entrega principalmente al final", "Requisitos estables", "Planificación inicial"],
    "Modelo V": ["Etapas secuenciales vinculadas con pruebas", "Baja", "Entrega al finalizar validaciones", "Sistemas con verificación rigurosa", "Pruebas planificadas desde el inicio"],
    "Iterativo e Incremental": ["Ciclos y entregas parciales", "Media/alta", "Incrementos sucesivos", "Requisitos que evolucionan", "Revisión en cada iteración"],
    "Scrum": ["Sprints con objetivo definido", "Alta", "Incremento al final de cada sprint", "Trabajo complejo y cambiante", "Inspección y adaptación frecuente"],
    "Kanban": ["Flujo continuo visualizado en tablero", "Alta", "Entrega según flujo y prioridad", "Trabajo continuo y prioridades variables", "Límites WIP y mejora del flujo"],
    "XP": ["Iteraciones cortas y prácticas técnicas", "Alta", "Entregas pequeñas y frecuentes", "Software con cambios frecuentes", "TDD, programación en pareja e integración continua"]
};
function actualizarComparacion() {
    const elegidas = Array.from(checksMetodos).filter(function (check) { return check.checked; }).map(function (check) { return check.value; });
    const cuerpo = document.getElementById("cuerpoComparacion");
    if (!cuerpo) return;
    cuerpo.innerHTML = "";
    const aviso = document.getElementById("avisoComparacion");
    if (elegidas.length < 2) {
        aviso.textContent = "Seleccioná al menos dos metodologías para realizar una comparación.";
        return;
    }
    aviso.textContent = "Comparando " + elegidas.length + " metodologías.";
    const filas = ["Organización del trabajo", "Flexibilidad ante cambios", "Forma de entrega", "Uso recomendado", "Enfoque de calidad" ];
    filas.forEach(function (nombre, indice) {
        let fila = "<tr><th>" + nombre + "</th>";
        elegidas.forEach(function (metodo) { fila += "<td>" + datosMetodos[metodo][indice] + "</td>"; });
        fila += "</tr>";
        cuerpo.innerHTML += fila;
    });
    const encabezado = document.querySelector(".tabla-comparacion thead tr");
    encabezado.innerHTML = "<th>Característica</th>" + elegidas.map(function (metodo) { return "<th>" + metodo + "</th>"; }).join("");
}
checksMetodos.forEach(function (check) { check.addEventListener("change", actualizarComparacion); });
if (checksMetodos.length) actualizarComparacion();

// HISTORIA 19: encuesta por pasos y cálculo de coincidencias orientativas.
const formularioRecomendador = document.getElementById("formRecomendador");
if (formularioRecomendador) {
    const pasos = document.querySelectorAll(".pregunta-paso");
    let pasoActual = 0;
    const anterior = document.getElementById("anteriorPaso");
    const siguiente = document.getElementById("siguientePaso");
    const verResultado = document.getElementById("verResultado");
    function mostrarPaso() {
        pasos.forEach(function (paso, indice) {
            paso.classList.toggle("activa", indice === pasoActual);
            paso.style.display = indice === pasoActual ? "grid" : "none";
        });
        anterior.disabled = pasoActual === 0;
        siguiente.classList.toggle("oculto", pasoActual === pasos.length - 1);
        verResultado.classList.toggle("oculto", pasoActual !== pasos.length - 1);
        document.getElementById("textoProgreso").textContent = "Pregunta " + (pasoActual + 1) + " de " + pasos.length;
        const porcentaje = Math.round(((pasoActual + 1) / pasos.length) * 100);
        document.getElementById("porcentajeProgreso").textContent = porcentaje + "%";
        document.getElementById("barraProgreso").style.width = porcentaje + "%";
    }
    function pasoCompleto() {
        const radios = pasos[pasoActual].querySelectorAll("input[type=radio]");
        return Array.from(radios).some(function (radio) { return radio.checked; });
    }
    siguiente.addEventListener("click", function () {
        if (!pasoCompleto()) { alert("Seleccioná una respuesta para continuar."); return; }
        if (pasoActual < pasos.length - 1) { pasoActual++; mostrarPaso(); }
    });
    anterior.addEventListener("click", function () { if (pasoActual > 0) { pasoActual--; mostrarPaso(); } });
    formularioRecomendador.addEventListener("submit", function (evento) {
        evento.preventDefault();
        if (!pasoCompleto()) { alert("Seleccioná una respuesta para ver el resultado."); return; }
        const respuestas = new FormData(formularioRecomendador);
        const puntos = { Scrum: 0, Kanban: 0, Cascada: 0 };
        const r = respuestas.get("requisitos");
        if (r === "claros") puntos.Cascada += 3;
        if (r === "cambiantes") { puntos.Scrum += 2; puntos.Kanban += 2; }
        if (r === "parciales") puntos.Scrum += 2;
        const e = respuestas.get("entregas");
        if (e === "final") puntos.Cascada += 3;
        if (e === "incrementos") puntos.Scrum += 3;
        if (e === "continuo") puntos.Kanban += 3;
        const q = respuestas.get("equipo");
        if (q === "plan") puntos.Cascada += 2;
        if (q === "colaboracion") puntos.Scrum += 2;
        if (q === "flujo") puntos.Kanban += 2;
        if (q === "tecnica") { puntos.Scrum += 1; puntos.Kanban += 1; }
        const p = respuestas.get("pruebas");
        if (p === "formal") puntos.Cascada += 2;
        if (p === "continua") { puntos.Scrum += 2; puntos.Kanban += 1; }
        if (p === "tdd") puntos.Scrum += 2;
        const total = puntos.Scrum + puntos.Kanban + puntos.Cascada;
        const orden = Object.keys(puntos).sort(function (a,b) { return puntos[b] - puntos[a]; });
        const mejor = orden[0];
        const explicaciones = { Scrum: "Scrum puede ser adecuado porque permite trabajar en sprints, colaborar y revisar incrementos con frecuencia.", Kanban: "Kanban puede ser adecuado porque permite visualizar tareas, gestionar un flujo continuo y adaptar prioridades.", Cascada: "Cascada puede ser adecuada porque ofrece etapas definidas y una planificación inicial cuando los requisitos son estables." };
        document.getElementById("resumenRecomendacion").textContent = "La mayor coincidencia es " + mejor + ". " + explicaciones[mejor] + " Evaluá también el tamaño del equipo, los riesgos y las necesidades reales antes de decidir.";
        const caja = document.getElementById("coincidencias");
        caja.innerHTML = "";
        orden.forEach(function (metodo) {
            const porcentaje = total === 0 ? 0 : Math.round(puntos[metodo] / total * 100);
            caja.innerHTML += "<div class='coincidencia'><div class='coincidencia-cabecera'><span>" + metodo + "</span><span>" + porcentaje + "%</span></div><div class='coincidencia-fondo'><span style='width:" + porcentaje + "%'></span></div></div>";
        });
        document.getElementById("resultadoRecomendador").classList.remove("oculto");
        formularioRecomendador.classList.add("oculto");
        document.getElementById("resultadoRecomendador").scrollIntoView({behavior:"smooth"});
    });
    document.getElementById("reiniciarEncuesta").addEventListener("click", function () {
        formularioRecomendador.reset(); pasoActual = 0; mostrarPaso();
        formularioRecomendador.classList.remove("oculto");
        document.getElementById("resultadoRecomendador").classList.add("oculto");
        formularioRecomendador.scrollIntoView({behavior:"smooth"});
    });
    mostrarPaso();
}
