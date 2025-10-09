import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const FormularioAlumno = ({ agregarOActualizarAlumno, alumnoAEditar, setAlumnoAEditar }) => {
  // Estados para cada campo del formulario
  const [documento, setDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  // Este efecto se ejecuta cuando 'alumnoAEditar' cambia.
  // Si se le pasa un alumno, llena el formulario con sus datos.
  useEffect(() => {
    if (alumnoAEditar) {
      setDocumento(alumnoAEditar.documento_alumno);
      setNombre(alumnoAEditar.nombre_alumno);
      setApellido(alumnoAEditar.apellido_alumno);
      setTelefono(alumnoAEditar.telefono_alumno);
      setCorreo(alumnoAEditar.correo_alumno);
    } else {
      // Si no hay alumno para editar, limpia los campos.
      limpiarFormulario();
    }
  }, [alumnoAEditar]);

  // Función para resetear todos los campos
  const limpiarFormulario = () => {
    setDocumento("");
    setNombre("");
    setApellido("");
    setTelefono("");
    setCorreo("");
  };

  // Maneja el envío del formulario (tanto para registrar como para actualizar)
  const handleSubmit = (e) => {
    e.preventDefault();
    agregarOActualizarAlumno({
      documento_alumno: documento,
      nombre_alumno: nombre,
      apellido_alumno: apellido,
      telefono_alumno: telefono,
      correo_alumno: correo,
    });
  };

  // Maneja la acción del botón Cancelar
  const handleCancelar = () => {
    setAlumnoAEditar(null); // Quita el modo de edición
    limpiarFormulario();   // Limpia los campos
  };

  return (
    // La clase h-100 asegura que esta tarjeta ocupe toda la altura disponible
    <div className="card p-4 h-100">
      <h3 className="mb-4">Formulario</h3>
      <form onSubmit={handleSubmit}>
        {/* --- CAMPO DOCUMENTO --- */}
        <div className="mb-3">
          <label htmlFor="documento" className="form-label">Documento:</label>
          <input
            type="text"
            id="documento"
            className="form-control"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
            // Se deshabilita el campo al editar para evitar cambiar el ID
            disabled={!!alumnoAEditar}
          />
        </div>

        {/* --- CAMPO NOMBRE --- */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input type="text" id="nombre" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>

        {/* --- CAMPO APELLIDO --- */}
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido:</label>
          <input type="text" id="apellido" className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
        </div>

        {/* --- CAMPO TELÉFONO --- */}
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono:</label>
          <input type="text" id="telefono" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        </div>

        {/* --- CAMPO CORREO --- */}
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo:</label>
          <input type="email" id="correo" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div>

        {/* --- BOTONES --- */}
        <div className="d-grid gap-2">
          {/* El botón cambia de texto y color si estamos en modo edición */}
          <button type="submit" className={alumnoAEditar ? "btn btn-warning" : "btn btn-success"}>
            {alumnoAEditar ? "Actualizar" : "Registrar"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

// Definición de los tipos de props para validación
FormularioAlumno.propTypes = {
  agregarOActualizarAlumno: PropTypes.func.isRequired,
  alumnoAEditar: PropTypes.object,
  setAlumnoAEditar: PropTypes.func.isRequired,
};

export default FormularioAlumno;