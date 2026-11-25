import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

type ErrorCampo = { mensaje?: string } | null;

type ErroresLogin = {
  nickName: ErrorCampo;
  password: ErrorCampo;
};

const SIN_ERRORES: ErroresLogin = { nickName: null, password: null };
const SOLO_ROJO: ErrorCampo = {};


function Login() {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState<ErroresLogin>(SIN_ERRORES);
  const [cargando, setCargando] = useState(false);
  const { ingresar } = useAuth();
  const navigate = useNavigate();

  function limpiarErrores() {
    setErrores(SIN_ERRORES);
  }

  async function handleSubmit() {
    limpiarErrores();

    const erroresValidacion: ErroresLogin = {
      nickName: nickName.trim() ? null : { mensaje: "Debes ingresar el usuario." },
      password: password ? null : { mensaje: "Debes ingresar la contraseña." },
    };

    if (erroresValidacion.nickName || erroresValidacion.password) {
      setErrores(erroresValidacion);
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
        setErrores({
          nickName: SOLO_ROJO,
          password: { mensaje: "Credenciales incorrectas" },
        });
        return;
      }
      setErrores({
        nickName: { mensaje },
        password: { mensaje },
      });
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
                    className={`form-control ${errores.nickName ? "is-invalid" : ""}`}
                    placeholder="Tu nombre de usuario"
                    value={nickName}
                    onChange={(event) => {
                      setNickName(event.target.value);
                      limpiarErrores();
                    }}
                    autoComplete="username"
                    maxLength={50}
                  />
                  {errores.nickName && errores.nickName.mensaje && (
                    <div className="invalid-feedback">{errores.nickName.mensaje}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    className={`form-control ${errores.password ? "is-invalid" : ""}`}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      limpiarErrores();
                    }}
                    autoComplete="current-password"
                  />
                  {errores.password && errores.password.mensaje && (
                    <div className="invalid-feedback">{errores.password.mensaje}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100 rounded-pill" disabled={cargando}>
                  {cargando ? "Ingresando..." : "Iniciar sesión"}
                </button>
              </form>

              <p className="text-center small mt-4 mb-0">
                ¿No tenés cuenta? <Link to="/registro" className="link-color">Registrate</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
