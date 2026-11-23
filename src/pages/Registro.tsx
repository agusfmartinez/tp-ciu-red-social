import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Registro = () => {
  const [nickName, setNickName] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const { registrarse } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit() {
    if (nickName.trim().length < 4) {
      setError("El nombre de usuario debe tener al menos 4 caracteres.");
      return;
    }

    setError("");
    setCargando(true);
    try {
      await registrarse(nickName);
      navigate("/publicaciones");
    } catch (err) {
      // acá llega el mensaje del backend, ej: "Ya existe un usuario con el nickname juan."
      setError(err instanceof Error ? err.message : "No se pudo registrar.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card border-0 rounded-4 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h1 className="h3 fw-bold text-center mb-1">Crear cuenta</h1>

              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} noValidate>
                <div className="mb-4">
                  <label htmlFor="nickName" className="form-label">Nombre de usuario</label>
                  <input
                    type="text"
                    id="nickName"
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                    maxLength={50}
                  />
                  <div className="invalid-feedback">{error}</div>
                  <div className="form-text">Mínimo 4 caracteres.</div>
                </div>

                <div className="alert alert-info small py-2">
                  Para ingresar vas a usar la contraseña <strong>123456</strong>.
                </div>

                <button type="submit" className="btn btn-primary w-100 rounded-pill" disabled={cargando}>
                  {cargando ? "Creando cuenta..." : "Registrarse"}
                </button>
              </form>

              <p className="text-center small mt-4 mb-0">
                ¿Ya tenés cuenta? <Link to="/login" className="link-success">Iniciá sesión</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registro;
