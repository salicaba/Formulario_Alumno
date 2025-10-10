import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FormularioAlumno = ({ agregarOActualizarAlumno, alumnoAEditar, setAlumnoAEditar, errors, setErrors }) => {
  const [documento, setDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  useEffect(() => {
    if (alumnoAEditar) {
      setDocumento(alumnoAEditar.documento_alumno);
      setNombre(alumnoAEditar.nombre_alumno);
      setApellido(alumnoAEditar.apellido_alumno);
      setTelefono(alumnoAEditar.telefono_alumno);
      setCorreo(alumnoAEditar.correo_alumno);
    } else {
      limpiarFormulario();
    }
  }, [alumnoAEditar]);

  const limpiarFormulario = () => {
    setDocumento(""); setNombre(""); setApellido(""); setTelefono(""); setCorreo("");
  };

  const handleInputChange = (setter, fieldName) => (e) => {
    setter(e.target.value);
    // Si hay un error en este campo, lo limpiamos al empezar a escribir
    if (errors[fieldName]) {
      setErrors(prevErrors => ({ ...prevErrors, [fieldName]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarOActualizarAlumno({
      documento_alumno: documento,
      nombre_alumno: nombre,
      apellido_alumno: apellido,
      telefono_alumno: telefono,
      correo_alumno: correo,
    });
    // Limpiamos el formulario solo si estamos agregando y no hay errores
    if (!alumnoAEditar && Object.keys(errors).length === 0) {
        limpiarFormulario();
    }
  };

  const handleCancelar = () => {
    limpiarFormulario();
    setAlumnoAEditar(null);
    setErrors({});
  };

  return (
    <div className="card p-4 h-100">
      <h3 className="mb-4">{alumnoAEditar ? 'Editando Alumno' : 'Formulario de Registro'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="documento" className="form-label">Documento:</label>
          <input
            type="text" id="documento"
            className={`form-control ${errors.documento_alumno ? 'is-invalid' : ''}`}
            value={documento}
            onChange={handleInputChange(setDocumento, 'documento_alumno')}
            disabled={!!alumnoAEditar}
            required
          />
          {errors.documento_alumno && <div className="invalid-feedback">{errors.documento_alumno}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input
            type="text" id="nombre"
            className={`form-control ${errors.nombre_alumno ? 'is-invalid' : ''}`}
            value={nombre}
            onChange={handleInputChange(setNombre, 'nombre_alumno')}
            required
          />
          {errors.nombre_alumno && <div className="invalid-feedback">{errors.nombre_alumno}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido:</label>
          <input
            type="text" id="apellido"
            className={`form-control ${errors.apellido_alumno ? 'is-invalid' : ''}`}
            value={apellido}
            onChange={handleInputChange(setApellido, 'apellido_alumno')}
            required
          />
          {errors.apellido_alumno && <div className="invalid-feedback">{errors.apellido_alumno}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono:</label>
          <input
            type="tel" id="telefono"
            className={`form-control ${errors.telefono_alumno ? 'is-invalid' : ''}`}
            value={telefono}
            onChange={handleInputChange(setTelefono, 'telefono_alumno')}
            required
          />
          {errors.telefono_alumno && <div className="invalid-feedback">{errors.telefono_alumno}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo:</label>
          <input
            type="email" id="correo"
            className={`form-control ${errors.correo_alumno ? 'is-invalid' : ''}`}
            value={correo}
            onChange={handleInputChange(setCorreo, 'correo_alumno')}
            required
          />
          {errors.correo_alumno && <div className="invalid-feedback">{errors.correo_alumno}</div>}
        </div>

        <div className="d-grid gap-2 mt-4">
          <button type="submit" className={`btn ${alumnoAEditar ? 'btn-warning' : 'btn-success'}`}>
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

FormularioAlumno.propTypes = {
  agregarOActualizarAlumno: PropTypes.func.isRequired,
  alumnoAEditar: PropTypes.object,
  setAlumnoAEditar: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setErrors: PropTypes.func.isRequired,
};

export default FormularioAlumno;

