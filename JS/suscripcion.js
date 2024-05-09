document.getElementById('form-suscripcion').addEventListener('submit', function(event) {
    var politicasAceptadas = document.getElementById('politicasdeprivacidad').checked;

    if (!politicasAceptadas) {
        alert('Debes aceptar las políticas de privacidad antes de suscribirte.');
        event.preventDefault(); 
    } else {
        var planSeleccionado = document.getElementById('plan').value;
        var mensaje = "";

        switch(planSeleccionado) {
            case "basico":
                mensaje = "Te has suscrito al Plan Básico. ¡Bienvenido!";
                break;
            case "estandar":
                mensaje = "Te has suscrito al Plan Estándar. ¡Bienvenido!";
                break;
            case "premium":
                mensaje = "Te has suscrito al Plan Premium. ¡Bienvenido!";
                break;
            default:
                alert("Por favor selecciona un plan de suscripción.");
                event.preventDefault(); 
                return; 
        }
        window.location.href="./index.html"
        alert(mensaje);
        
    }
});

document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault(); 
    alert('Has iniciado sesión correctamente en Book Blend. ¡Bienvenido de vuelta!');
    window.location.href="./index.html"
});

