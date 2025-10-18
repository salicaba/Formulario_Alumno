import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FormularioAlumno from './components/FormularioAlumno.jsx';
import axios from 'axios'; // 1. IMPORTAMOS AXIOS

const API_URL = 'http://localhost:3000/api/estudiantes';

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoAEditar, setAlumnoAEditar] = useState(null);
  const [errors, setErrors] = useState({});

  // 2. FUNCIÓN PARA OBTENER DATOS CON AXIOS
  const fetchAlumnos = async () => {
    try {
      const response = await axios.get(API_URL);
      // Mapeamos los nombres de la BD a los del estado del componente
      const alumnosMapeados = response.data.map(a => ({
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

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const validateForm = (formData) => {
    // ... (Tu función de validación se mantiene igual)
    const newErrors = {};
    const { documento_alumno, nombre_alumno, apellido_alumno, correo_alumno, telefono_alumno } = formData;
    if (!/^\d+$/.test(documento_alumno)) newErrors.documento_alumno = 'El documento solo debe contener números.';
    if (!/^[a-zA-Z\s]+$/.test(nombre_alumno)) newErrors.nombre_alumno = 'El nombre solo debe contener letras y espacios.';
    if (!/^[a-zA-Z\s]+$/.test(apellido_alumno)) newErrors.apellido_alumno = 'El apellido solo debe contener letras y espacios.';
    if (!/^\d{10}$/.test(telefono_alumno)) newErrors.telefono_alumno = 'El teléfono debe tener 10 dígitos y solo contener números.';
    if (!/\S+@\S+\.\S+/.test(correo_alumno)) newErrors.correo_alumno = 'El formato del correo electrónico no es válido.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 3. FUNCIÓN PARA AGREGAR/ACTUALIZAR CON AXIOS
  const agregarOActualizarAlumno = async (alumnoData) => {
    if (!validateForm(alumnoData)) {
      return false;
    }

    try {
      if (alumnoAEditar) {
        // Actualizar (PUT)
        await axios.put(`${API_URL}/${alumnoAEditar.documento_alumno}`, alumnoData);
      } else {
        // Agregar (POST)
        await axios.post(API_URL, alumnoData);
      }

      setAlumnoAEditar(null);
      setErrors({});
      await fetchAlumnos(); // Recargar la lista
      return true; // Éxito

    } catch (error) {
      console.error("Error del servidor al guardar el alumno:", error);
      alert('Error al guardar el alumno. Verifique que el documento no esté duplicado.');
      return false; // Error
    }
  };

  // 4. FUNCIÓN PARA ELIMINAR CON AXIOS
  const handleDelete = async (documento) => {
    if(window.confirm("¿Estás seguro de que deseas eliminar a este estudiante?")){
        try {
            await axios.delete(`${API_URL}/${documento}`);
            await fetchAlumnos(); // Recargar la lista
        } catch (error) {
            console.error("Error al eliminar el estudiante:", error);
            alert('Error al eliminar el estudiante.');
        }
    }
  };

  const handleEdit = (alumno) => {
    setAlumnoAEditar(alumno);
    setErrors({});
  };

  // EL CÓDIGO JSX (return (...)) SE MANTIENE EXACTAMENTE IGUAL
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Control de Estudiantes</h1>
      <div className="row">
        <div className="col-lg-4 mb-4">
          <FormularioAlumno
            agregarOActualizarAlumno={agregarOActualizarAlumno}
            alumnoAEditar={alumnoAEditar}
            setAlumnoAEditar={setAlumnoAEditar}
            errors={errors}
            setErrors={setErrors}
          />
        </div>
        <div className="col-lg-8">
          <div className="card p-4 h-100">
            <h3 className="mb-4">Lista de Estudiantes</h3>
            <div className="table-responsive">
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
                    <tr><td colSpan="6" className="text-center text-muted py-4">No hay estudiantes registrados.</td></tr>
                  ) : (
                    alumnos.map((alumno) => (
                      <tr key={alumno.documento_alumno}>
                        <td>{alumno.documento_alumno}</td>
                        <td>{alumno.nombre_alumno}</td>
                        <td>{alumno.apellido_alumno}</td>
                        <td>{alumno.correo_alumno}</td>
                        <td>{alumno.telefono_alumno}</td>
                        <td>
                          <button onClick={() => handleEdit(alumno)} className="btn btn-warning btn-sm me-2">Editar</button>
                          <button onClick={() => handleDelete(alumno.documento_alumno)} className="btn btn-danger btn-sm">Eliminar</button>
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