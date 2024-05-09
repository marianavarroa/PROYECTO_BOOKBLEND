// Función para manejar el envío del formulario
function enviarFormulario(evento) {
    evento.preventDefault();

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombreUsuario').value.trim();
    const apellido = document.getElementById('apellidoUsuario').value.trim();
    const correo = document.getElementById('emailUsuario').value.trim();
    const telefono = document.getElementById('telUsuario').value.trim();
    const mensaje = document.getElementById('message').value.trim();
    const politicas = document.getElementById('politicasdeprivacidad').checked;

    // Validar los campos del formulario y enviar sino un mensaje de alerta
    if (nombre !== '' && apellido !== '' && correo !== '' && telefono && mensaje !== '' && politicas) {
        alert('Formulario enviado correctamente.');
        document.querySelector('form').reset(); // Limpiar el formulario después del envío
    } else {
        alert('Por favor, complete todos los campos obligatorios correctamente y acepte la política de privacidad.');
    }
}

function detectarEnvioFormulario() {
    const formulario = document.querySelector('form');
    formulario.addEventListener('submit', enviarFormulario);
}

detectarEnvioFormulario();

