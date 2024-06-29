document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productoForm');
    const tableBody = document.getElementById('usuariosTable').querySelector('tbody');
    let isUpdating = false;

    //async permite que la función se comporte de manera asíncrona, 
    //puede ejecutar operaciones sin bloquear el hilo principal de ejecucion
    const fetchusuarios = async () => {
        //luego cambiaremos la url por https://<hostdepanywhere>/usuarios
        const response = await fetch('https://milepeletay13gg.pythonanywhere.com/usuarios');// promesa: esperar a que se complete la solicitud HTTP
        const usuarios = await response.json(); //esperar a que se complete la conversión de la respuesta a JSON
        tableBody.innerHTML = '';
        usuarios.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio}</td>
                <td>
                    <button onclick="editProducto(${producto.id}, '${producto.nombre}', ${producto.cantidad}, ${producto.precio})">Editar</button>
                    <button onclick="deleteProducto(${producto.id})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    const addProducto = async (producto) => {
        await fetch('https://milepeletay13gg.pythonanywhere.com/agregar_usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        fetchusuarios();
    };

    const updateProducto = async (id, producto) => {
        await fetch(`https://milepeletay13gg.pythonanywhere.com/actualizar_usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        fetchusuarios();
    };

    const deleteProducto = async (id) => {
        await fetch(`https://milepeletay13gg.pythonanywhere.com/eliminar_usuario/${id}`, {
            method: 'DELETE'
        });
        fetchusuarios();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('productoId').value;
        const nombre = document.getElementById('nombre').value;
        const cantidad = document.getElementById('cantidad').value;
        const precio = document.getElementById('precio').value;
        const producto = { nombre, cantidad, precio };

        if (isUpdating) {
            updateProducto(id, producto);
            isUpdating = false;
        } else {
            addProducto(producto);
        }

        form.reset();
        document.getElementById('productoId').value = '';
    });

    window.editProducto = (id, nombre, cantidad, precio) => {
        document.getElementById('productoId').value = id;
        document.getElementById('nombre').value = nombre;
        document.getElementById('cantidad').value = cantidad;
        document.getElementById('precio').value = precio;
        isUpdating = true;
    };

    window.deleteProducto = (id) => {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            deleteProducto(id);
        }
    };

    fetchusuarios();
});
