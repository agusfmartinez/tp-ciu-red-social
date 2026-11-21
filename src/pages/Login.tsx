import { Link } from "react-router";

function Login() {
  return (
    <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-12 col-md-4">
                <div className="card border-0 rounded-4 shadow-sm">
                    <div className="card-body p-4">
                        <h1>Iniciar sesión</h1>

                        <form>
                            <div className="mb-3">
                                <label htmlFor="nickName">Nombre de usuario</label>
                                <input type="text" className="form-control" id="nickName" placeholder="nickName"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" className="form-control" id="password" placeholder="*****"/>
                            </div>

                            <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                        </form>

                        <p className="text-center small mt-4 mb-0">
                            ¿No tenés cuenta? <Link to="/registro" className="link-success">Registrate</Link>
                        </p>

                    </div>

                </div>
            </div>

        </div>
        
    </div>
  );
}

export default Login;