document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('perfil');
    // const tableBody = document.getElementById('usuariosTable').querySelector('tbody');
    let isUpdating = false;

    //async permite que la función se comporte de manera asíncrona, 
    //puede ejecutar operaciones sin bloquear el hilo principal de ejecucion
    const fetchusuarios = async () => {
        //luego cambiaremos la url por https://<hostdepanywhere>/usuarios
        const response = await fetch('http://127.0.0.1:5000/usuarios');// promesa: esperar a que se complete la solicitud HTTP
        const usuarios = await response.json(); //esperar a que se complete la conversión de la respuesta a JSON
        // form.innerHTML = ''; (estaba borrando el div id perfil por eso lo comente)
        usuarios.forEach(usuario => {
            const row = document.createElement('td');
            row.innerHTML = `
                <th>${usuario.id}</th>
                <th>${usuario.nombre_apellido}</th>
                <th>${usuario.mail}</th>
                <th>${usuario.tarjeta}</th>
                <th>${usuario.plan}</th>
                <th>
                    <button onclick="editUsuario(${usuario.id}, '${usuario.nombre_apellido}', '${usuario.mail}', '${usuario.tarjeta}', '${usuario.plan}')">Editar</button>
                    <button onclick="deleteUsuario(${usuario.id})">Eliminar</button>
                </th>
            `;
            tableBody.appendChild(row);
        });
    };

    const addUsuario = async (usuario) => {
        await fetch('http://127.0.0.1:5000/agregar_usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        fetchusuarios();
    };

    const updateUsuario = async (id, usuario) => {
        await fetch('http://127.0.0.1:5000/actualizar_usuario/${id}', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        fetchusuarios();
    };

    const deleteUsuario = async (id) => {
        await fetch('http://127.0.0.1:5000/eliminar_usuario/${id}', {
            method: 'DELETE'
        });
        fetchusuarios();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('usuarioId').value;
        const nombre_apellido = document.getElementById('nombre_apellido').value;
        const mail = document.getElementById('mail').value;
        const tarjeta = document.getElementById('tarjeta').value;
        const plan = document.getElementById('plan').value;
        const usuario = { nombre_apellido, mail, tarjeta, plan };

        if (isUpdating) {
            updateUsuario(id, usuario);
            isUpdating = false;
        } else {
            addUsuario(usuario);
        }

        form.reset();
        document.getElementById('usuarioId').value = '';
    });

    window.editUsuario = (id, nombre_apellido, mail, tarjeta, plan) => {
        document.getElementById('usuarioId').value = id;
        document.getElementById('nombre_apellido').value = nombre_apellido;
        document.getElementById('mail').value = mail;
        document.getElementById('tarjeta').value = tarjeta;
        document.getElementById('plan').value = plan;
        isUpdating = true;
    };

    window.deleteUsuario = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar tu usuario?')) {
            deleteUsuario(id);
        }
    };

    fetchusuarios();
});



document.getElementById('formActualizar').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    var form = event.target;
    var data = new FormData(form);
    var jsonData = {};
    data.forEach((value, key) => { jsonData[key] = value });

    fetch('/http://127.0.0.1:5000/agregar_usuario', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Éxito:', data);
      alert('Datos actualizados correctamente');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Hubo un error al actualizar los datos');
    });
  });