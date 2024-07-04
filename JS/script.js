document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('librosForm');
    const tableBody = document.getElementById('librosTable').querySelector('tbody');
    let isUpdating = false;

    const fetchLibros = async () => {
        const response = await fetch('https://marianav91.pythonanywhere.com/libros');
        const libros = await response.json(); 
        tableBody.innerHTML = '';
        libros.forEach(libro => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${libro.id}</td>
                <td>${libro.nombre}</td>
                <td>${libro.autor}</td>
                <td>${libro.editorial}</td>
                <td>${libro.edicion}</td>
                <td>
                    <button onclick="editLibro(${libro.id}, '${libro.nombre}', ${libro.autor}, ${libro.editorial}, ${libro.edicion})">Editar</button>
                    <button onclick="deleteLibro(${libro.id})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    const addLibro = async (libro) => {
        await fetch('https://marianav91.pythonanywhere.com/agregar_libro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(libro)
        });
        fetchLibros();
    };

    const updateLibro = async (id, libro) => {
        await fetch(`https://marianav91.pythonanywhere.com/actualizar_libro/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(libro)
        });
        fetchLibros();
    };

    const deleteLibro = async (id) => {
        await fetch(`https://marianav91.pythonanywhere.com/eliminar_libro/${id}`, {
            method: 'DELETE'
        });
        fetchLibros();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('librosId').value;
        const nombre = document.getElementById('nombre').value;
        const autor = document.getElementById('autor').value;
        const editorial = document.getElementById('editorial').value;
        const edicion = document.getElementById('edicion').value;
        const libro = { nombre, autor, editorial, edicion };

        if (isUpdating) {
            updateLibro(id, libro);
            isUpdating = false;
        } else {
            addLibro(libro);
        }

        form.reset();
        document.getElementById('librosId').value = '';
    });

    window.editLibro = (id, nombre, autor, editorial, edicion) => {
        document.getElementById('librosId').value = id;
        document.getElementById('nombre').value = nombre;
        document.getElementById('autor').value = autor;
        document.getElementById('editorial').value = editorial;
        document.getElementById('edicion').value = edicion;
        isUpdating = true;
    };

    window.deleteLibro = (id) => {
        if (confirm('¿Estás seguro de eliminar este libro?')) {
            deleteLibro(id);
        }
    };

    fetchLibros();
});
