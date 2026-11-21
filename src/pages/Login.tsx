
function Login() {
  return (
    <div className="container py-5 d-flex justify-content-center">
        <form style={{ width: '18rem'}}>
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
    </div>
  );
}

export default Login;