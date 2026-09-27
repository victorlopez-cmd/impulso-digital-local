document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const botonAumentar =
        document.getElementById("aumentar-texto");

    const botonDisminuir =
        document.getElementById("disminuir-texto");

    const botonContraste =
        document.getElementById("contraste");

    const botonEscuchar =
        document.getElementById("escuchar");

    const contenido =
        document.getElementById("contenido");


    /* =====================================================
       TAMAÑO DEL TEXTO
       ===================================================== */

    let tamanoTexto = 18;


    botonAumentar.addEventListener("click", () => {

        if (tamanoTexto < 24) {

            tamanoTexto += 2;

            document.documentElement.style.setProperty(
                "--tamano-base",
                `${tamanoTexto}px`
            );

        }

    });


    botonDisminuir.addEventListener("click", () => {

        if (tamanoTexto > 16) {

            tamanoTexto -= 2;

            document.documentElement.style.setProperty(
                "--tamano-base",
                `${tamanoTexto}px`
            );

        }

    });



    /* =====================================================
       ALTO CONTRASTE
       ===================================================== */

    botonContraste.addEventListener("click", () => {

        const activo =
            document.body.classList.toggle(
                "alto-contraste"
            );


        botonContraste.setAttribute(
            "aria-pressed",
            activo.toString()
        );


        botonContraste.textContent =
            activo
                ? "Contraste normal"
                : "Alto contraste";

    });



    /* =====================================================
       LECTURA EN VOZ ALTA
       ===================================================== */

    let leyendo = false;


    botonEscuchar.addEventListener("click", () => {

        if (!("speechSynthesis" in window)) {

            alert(
                "Tu navegador no admite la función de lectura en voz alta."
            );

            return;

        }


        /*
         * Si ya está leyendo,
         * el botón detiene la lectura.
         */

        if (leyendo) {

            window.speechSynthesis.cancel();

            leyendo = false;

            botonEscuchar.textContent =
                "🔊 Escuchar";

            botonEscuchar.setAttribute(
                "aria-pressed",
                "false"
            );

            return;

        }


        /*
         * Obtenemos únicamente el contenido
         * principal de la página.
         */

        const texto =
            contenido.innerText;


        const lectura =
            new SpeechSynthesisUtterance(
                texto
            );


        /*
         * Español de México.
         */

        lectura.lang = "es-MX";


        /*
         * Una velocidad ligeramente más lenta
         * favorece la comprensión.
         */

        lectura.rate = 0.9;

        lectura.pitch = 1;



        lectura.onstart = () => {

            leyendo = true;

            botonEscuchar.textContent =
                "⏹ Detener";

            botonEscuchar.setAttribute(
                "aria-pressed",
                "true"
            );

        };


        lectura.onend = () => {

            leyendo = false;

            botonEscuchar.textContent =
                "🔊 Escuchar";

            botonEscuchar.setAttribute(
                "aria-pressed",
                "false"
            );

        };


        lectura.onerror = () => {

            leyendo = false;

            botonEscuchar.textContent =
                "🔊 Escuchar";

            botonEscuchar.setAttribute(
                "aria-pressed",
                "false"
            );

        };


        window.speechSynthesis.speak(
            lectura
        );

    });



    /* =====================================================
       DETENER LECTURA AL SALIR
       ===================================================== */

    window.addEventListener(
        "beforeunload",
        () => {

            if ("speechSynthesis" in window) {

                window.speechSynthesis.cancel();

            }

        }
    );

});