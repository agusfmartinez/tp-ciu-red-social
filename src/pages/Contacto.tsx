import { useState } from 'react';

const formularioVacio = { nombre: '', email: '', mensaje: '' };

interface Errores {
  nombre?: string;
  email?: string;
  mensaje?: string;
}

const Contacto = () => {
  const [formulario, setFormulario] = useState(formularioVacio);
  const [errores, setErrores] = useState<Errores>({});
  const [enviado, setEnviado] = useState(false);

  function handleChange(name: string, value: string) {
    setFormulario({ ...formulario, [name]: value });
  }

  function validar() {
    const nuevosErrores: Errores = {};

    if (formulario.nombre.trim() === '') {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    }

    if (formulario.email.trim() === '') {
      nuevosErrores.email = 'El email es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email)) {
      nuevosErrores.email = 'El email no tiene un formato válido.';
    }

    if (formulario.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    }

    return nuevosErrores;
  }

  function handleSubmit() {
    const nuevosErrores = validar();
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    setEnviado(true);
    setFormulario(formularioVacio);
  }

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-12 col-md-5">
          <h2>Contacto</h2>
          <p>¿Tenés alguna consulta? Escribinos y te respondemos a la brevedad.</p>
          <p><strong>Email:</strong> contacto@unahurantisocial.net</p>
          <p><strong>Teléfono:</strong> 123-456-7890</p>
          <p>Podes contactarnos por consultas sobre publicaciones, comentarios o el uso de la plataforma.</p>
        </div>

        <div className="col-12 col-md-7">
          {enviado && (
            <div className="alert alert-success">
              ¡Gracias por escribirnos! Te vamos a responder pronto.
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} noValidate>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                value={formulario.nombre}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <div className="invalid-feedback">{errores.nombre}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                value={formulario.email}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <div className="invalid-feedback">{errores.email}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
                value={formulario.mensaje}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <div className="invalid-feedback">{errores.mensaje}</div>
            </div>

            <button type="submit" className="btn btn-primary">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
