document.addEventListener('DOMContentLoaded', function() {
    const acordeones = document.querySelectorAll('.acordeon');

    acordeones.forEach(function(acordeon) {
        const btnAcordeon = acordeon.querySelector('.btn-acordeon');
        const contenidoAcordeon = acordeon.querySelector('.contenido-acordeon');

        btnAcordeon.addEventListener('click', function() {
            if (btnAcordeon.checked) {
                // Si el botón está marcado, abrir el contenido
                contenidoAcordeon.style.maxHeight = contenidoAcordeon.scrollHeight + "px";
            } else {
                // Si el botón no está marcado, cerrar el contenido
                contenidoAcordeon.style.maxHeight = "0px";
            }
        });
    });

    // cuando se hace clic fuera de él
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.acordeon')) {
            acordeones.forEach(function(acordeon) {
                acordeon.querySelector('.btn-acordeon').checked = false;
                acordeon.querySelector('.contenido-acordeon').style.maxHeight = '0px';
            });
        }
    });
});

  