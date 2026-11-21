

const Registro = () => {
  return (
    <div className="container py-5">
        <h1>Registrate</h1>
        <form>
          <div className="row d-flex justify-content-center">
            <div className="col-sm-4">
              <label htmlFor="nickName">Nombre de usuario</label>
              <input type="text" className="form-control" id="nickName" placeholder="Ingresa tu nombre de usuario"/>
              <small className="form-text text-muted">La contraseña para ingresar es 123456.</small>
              <button type="submit" className="btn btn-primary">Registrarse</button>
            </div>
          </div>
        </form>
    </div>
  )
}

export default Registro;