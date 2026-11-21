import { Link } from "react-router";

const Registro = () => {
  return (
    <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-12 col-md-4">
                <div className="card border-0 rounded-4 shadow-sm">
                    <div className="card-body p-4">
                        <h1>Registrate</h1>

                        <form>
                            <div className="mb-3">
                                <label htmlFor="nickName">Nombre de usuario</label>
                                <input type="text" className="form-control" id="nickName" placeholder="nickName"/>
                            </div>

                            <div className="alert alert-info small py-2">
                              Tu contraseña será <strong>123456</strong>.
                            </div>

                            <button type="submit" className="btn btn-primary">Registrarse</button>
                        </form>

                        <p className="text-center small mt-4 mb-0">
                            ¿Ya tenés cuenta? <Link to="/login" className="link-success">Iniciar sesión</Link>
                        </p>

                    </div>

                </div>
            </div>

        </div>
        
    </div>
  )
}

export default Registro;