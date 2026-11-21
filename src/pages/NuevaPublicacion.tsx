import { useState } from "react";
import type { DatosToast } from "../hooks/toastHook";

interface NuevaPublicacionProps {
  mostrarToast: (datos: DatosToast) => void;
}

function NuevaPublicacion({ mostrarToast }: NuevaPublicacionProps) {

  const [formulario, setFormulario] = useState({

    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    entrega: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormulario({
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
      entrega: "",
      mensaje: "",
    });

    mostrarToast({
      mensaje:'¡Muchas gracias!',
      tipo:'success',
      delay: 7000,
      titulo:'Publicación realizada correctamente!',
    });
  };

  return (
      <div className="container my-5">
        <h2>Nueva publicación</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre y apellido
            </label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              className="form-control"
              value={formulario.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-control"
              value={formulario.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Teléfono
            </label>
            <input
              id="telefono"
              type="tel"
              name="telefono"
              className="form-control"
              value={formulario.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">
              Dirección o localidad
            </label>
            <input
              id="direccion"
              type="text"
              name="direccion"
              className="form-control"
              value={formulario.direccion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="entrega" className="form-label">
              Método de entrega
            </label>
            <select
              id="entrega"
              name="entrega"
              className="form-select"
              value={formulario.entrega}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar método</option>
              <option value="domicilio">Envío a domicilio</option>
              <option value="local">Retiro en el local</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">
              Mensaje o aclaración
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              className="form-control"
              rows="3"
              value={formulario.mensaje}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-dark">
            Publicar
          </button>
        </form>
      </div>
  );
}

export default NuevaPublicacion;