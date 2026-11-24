import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [credencialesIncorrectas, setCredencialesIncorrectas] = useState(false);
  const [cargando, setCargando] = useState(false);
  const { ingresar } = useAuth();
  const navigate = useNavigate();

  function limpiarError() {
    setError("");
    setCredencialesIncorrectas(false);
  }

  async function handleSubmit() {
    limpiarError();

    if (!nickName.trim()) {
      setError("Ingresá tu nombre de usuario.");
      return;
    }
    if (!password) {
      setError("Ingresá tu contraseña.");
      return;
    }

    setCargando(true);
    try {
      await ingresar(nickName, password);
      navigate("/publicaciones");
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : "No se pudo iniciar sesión.";
      if (mensaje === "Credenciales incorrectas.") {
        setNickName("");
        setPassword("");
        setError("Credenciales incorrectas.");
        setCredencialesIncorrectas(true);
        return;
      }
      setError(mensaje);
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
              <h1 className="h3 fw-bold text-center mb-4">Iniciar sesión</h1>

              <form onSubmit={(event) => { event.preventDefault(); handleSubmit(); }} noValidate>
                <div className="mb-3">
                  <label htmlFor="nickName" className="form-label">Nombre de usuario</label>
                  <input
                    type="text"
                    id="nickName"
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    placeholder="Tu nombre de usuario"
                    value={nickName}
                    onChange={(event) => {
                      setNickName(event.target.value);
                      limpiarError();
                    }}
                    autoComplete="username"
                    maxLength={50}
                  />
                  {error && !credencialesIncorrectas && (
                    <div className="invalid-feedback">{error}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      limpiarError();
                    }}
                    autoComplete="current-password"
                  />
                  {error && <div className="invalid-feedback">{error}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100 rounded-pill" disabled={cargando}>
                  {cargando ? "Ingresando..." : "Iniciar sesión"}
                </button>
              </form>

              <p className="text-center small mt-4 mb-0">
                ¿No tenés cuenta? <Link to="/registro" className="link-success">Registrate</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
