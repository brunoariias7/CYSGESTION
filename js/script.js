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
