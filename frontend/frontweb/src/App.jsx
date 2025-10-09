import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FormularioAlumno from './components/FormularioAlumno.jsx';

// La URL base de tu backend. ¡Asegúrate de que el puerto sea el correcto!
const API_URL = 'http://localhost:3000/api/estudiantes';

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoAEditar, setAlumnoAEditar] = useState(null);

  // useEffect para cargar los estudiantes desde la BD al iniciar el componente
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // Mapeamos los datos para que coincidan con la estructura que espera el frontend
        const alumnosMapeados = data.map(a => ({
          documento_alumno: a.documento,
          nombre_alumno: a.nombre,
          apellido_alumno: a.apellido,
          correo_alumno: a.correo,
          telefono_alumno: a.telefono,
        }));
        setAlumnos(alumnosMapeados);
      } catch (error) {
        console.error("Error al cargar los estudiantes:", error);
      }
    };

    fetchAlumnos();
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  const agregarOActualizarAlumno = async (alumnoData) => {
    try {
      if (alumnoAEditar) {
        // --- Lógica para ACTUALIZAR ---
        const response = await fetch(`${API_URL}/${alumnoAEditar.documento_alumno}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alumnoData),
        });

        if (response.ok) {
          // Vuelve a cargar los datos para reflejar los cambios
          const fetchResponse = await fetch(API_URL);
          const data = await fetchResponse.json();
          const alumnosMapeados = data.map(a => ({
              documento_alumno: a.documento,
              nombre_alumno: a.nombre,
              apellido_alumno: a.apellido,
              correo_alumno: a.correo,
              telefono_alumno: a.telefono,
            }));
          setAlumnos(alumnosMapeados);
          setAlumnoAEditar(null);
        }
      } else {
        // --- Lógica para AGREGAR ---
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alumnoData),
        });

        if (response.ok) {
          // Vuelve a cargar los datos para reflejar los cambios
           const fetchResponse = await fetch(API_URL);
          const data = await fetchResponse.json();
          const alumnosMapeados = data.map(a => ({
              documento_alumno: a.documento,
              nombre_alumno: a.nombre,
              apellido_alumno: a.apellido,
              correo_alumno: a.correo,
              telefono_alumno: a.telefono,
            }));
          setAlumnos(alumnosMapeados);
        }
      }
    } catch (error) {
      console.error("Error al guardar el estudiante:", error);
    }
  };

  const handleDelete = async (documento) => {
    const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar a este estudiante?");
    if (isConfirmed) {
      try {
        const response = await fetch(`${API_URL}/${documento}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setAlumnos(alumnos.filter(a => a.documento_alumno !== documento));
        }
      } catch (error) {
        console.error("Error al eliminar el estudiante:", error);
      }
    }
  };

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
          <div className="card p-4 h-100">
            <h3 className="mb-4">Lista de Estudiantes</h3>
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
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        No hay estudiantes registrados.
                      </td>
                    </tr>
                  ) : (
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