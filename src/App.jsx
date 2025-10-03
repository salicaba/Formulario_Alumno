import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormularioAlumno from './components/FormularioAlumno.jsx';

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoAEditar, setAlumnoAEditar] = useState(null);

  // Función unificada para agregar un nuevo alumno o actualizar uno existente
  const agregarOActualizarAlumno = (alumnoData) => {
    if (alumnoAEditar) {
      // Lógica para ACTUALIZAR: busca y reemplaza el alumno en la lista
      setAlumnos(alumnos.map(a =>
        a.documento_alumno === alumnoAEditar.documento_alumno ? alumnoData : a
      ));
      setAlumnoAEditar(null); // Resetea el estado de edición
    } else {
      // Lógica para AGREGAR: añade el nuevo alumno a la lista
      setAlumnos([...alumnos, alumnoData]);
    }
  };

  // Función para eliminar un alumno por su documento
  const handleDelete = (documento) => {
    const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar a este estudiante?");
    if (isConfirmed) {
      setAlumnos(alumnos.filter(a => a.documento_alumno !== documento));
    }
  };

  // Función para poner un alumno en modo de edición
  const handleEdit = (alumno) => {
    setAlumnoAEditar(alumno);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Estudiantes</h1>
      <div className="row">
        {/* Columna para el formulario */}
        <div className="col-md-4 mb-4">
          <FormularioAlumno
            agregarOActualizarAlumno={agregarOActualizarAlumno}
            alumnoAEditar={alumnoAEditar}
            setAlumnoAEditar={setAlumnoAEditar}
          />
        </div>

        {/* Columna para la lista de estudiantes */}
        <div className="col-md-8">
          {/* La clase h-100 asegura que esta tarjeta ocupe toda la altura disponible */}
          <div className="card p-4 h-100">
            <h3 className="mb-4">Lista de Estudiantes</h3>
            {/* La clase 'table-responsive-md' quita el scroll en pantallas medianas o grandes */}
            <div className="table-responsive-md">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Documento</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.length === 0 ? (
                    // Si no hay alumnos, muestra una fila con el mensaje
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        No hay estudiantes registrados.
                      </td>
                    </tr>
                  ) : (
                    // Si hay alumnos, los mapea y muestra
                    alumnos.map((alumno) => (
                      <tr key={alumno.documento_alumno}>
                        <td>{alumno.documento_alumno}</td>
                        <td>{alumno.nombre_alumno}</td>
                        <td>{alumno.apellido_alumno}</td>
                        <td>{alumno.correo_alumno}</td>
                        <td>{alumno.telefono_alumno}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEdit(alumno)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(alumno.documento_alumno)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;