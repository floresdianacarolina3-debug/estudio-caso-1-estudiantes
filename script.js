
// Lista inicial de estudiantes
let estudiantes = [
    { nombre: "Maria", apellidos: "Mora Perez", nota: 90 },
    { nombre: "Pedro", apellidos: "Sibaja Lopez", nota: 60 },
    { nombre: "Marco", apellidos: "Rojas Castro", nota: 78 }
];

// Obtener elementos del DOM
const formulario = document.getElementById("studentForm");
const tabla = document.getElementById("studentTable");
const mensaje = document.getElementById("mensaje");

// Mostrar estudiantes en la tabla
function mostrarEstudiantes() {

    tabla.innerHTML = "";

    estudiantes.forEach(estudiante => {

        const fila = document.createElement("tr");

        const celdaNombre = document.createElement("td");
        const celdaApellidos = document.createElement("td");
        const celdaNota = document.createElement("td");

        celdaNombre.textContent = estudiante.nombre;
        celdaApellidos.textContent = estudiante.apellidos;
        celdaNota.textContent = estudiante.nota;

        // Aplicar estilos condicionales
        if (estudiante.nota >= 80) {
            celdaNota.classList.add("nota-alta");
        } else if (estudiante.nota < 65) {
            celdaNota.classList.add("nota-baja");
        }

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaApellidos);
        fila.appendChild(celdaNota);

        tabla.appendChild(fila);
    });

    actualizarResumen();
}

// Calcular y mostrar el resumen
function actualizarResumen() {

    const notas = estudiantes.map(e => e.nota);

    const mayor = Math.max(...notas);
    const menor = Math.min(...notas);

    const promedio = notas.reduce(
        (total, nota) => total + nota, 0
    ) / notas.length;

    const estudianteMayor = estudiantes.find(
        e => e.nota === mayor
    );

    document.getElementById("notaMayor").textContent = mayor;

    document.getElementById("estudianteMayor").textContent =
        estudianteMayor.nombre + " " + estudianteMayor.apellidos;

    document.getElementById("promedio").textContent =
        promedio.toFixed(2);

    document.getElementById("notaMenor").textContent = menor;
}

// Evento para agregar estudiantes
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const notaTexto = document.getElementById("nota").value.trim();

    // Validar campos vacíos
    if (nombre === "" || apellidos === "" || notaTexto === "") {

        mensaje.textContent =
            "Error: Todos los campos son obligatorios.";

        mensaje.className = "error";
        return;
    }

    const nota = Number(notaTexto);

    // Validar que la nota esté entre 0 y 100
    if (!Number.isFinite(nota) || nota < 0 || nota > 100) {

        mensaje.textContent =
            "Error: La nota debe ser un número entre 0 y 100.";

        mensaje.className = "error";
        return;
    }

    // Crear nuevo estudiante
    const nuevoEstudiante = {
        nombre: nombre,
        apellidos: apellidos,
        nota: nota
    };

    // Agregar al arreglo
    estudiantes.push(nuevoEstudiante);

    // Actualizar la tabla y el resumen
    mostrarEstudiantes();

    // Limpiar formulario
    formulario.reset();

    // Mostrar mensaje de éxito
    mensaje.textContent = "Estudiante agregado correctamente.";
    mensaje.className = "exito";

});

// Mostrar los estudiantes iniciales
mostrarEstudiantes();