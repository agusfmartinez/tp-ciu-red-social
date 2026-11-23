import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { useUsuarioActual } from '../hooks/useUsuarioActual';

const Registro = () => {

   const [nickName, setNickName] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { registrarse } = useUsuarioActual();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      await registrarse(nickName);
      navigate('/publicaciones');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo registrar.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-12 col-md-4">
                <div className="card border-0 rounded-4 shadow-sm">
                    <div className="card-body p-4">
                        <h1>Registrate</h1>

                        {error && <div className="alert alert-danger py-2">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                            <label htmlFor="nickName">Nombre de usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nickName"
                                value={nickName}
                                onChange={(e) => setNickName(e.currentTarget.value)}
                                minLength={4}
                                maxLength={50}
                                required
                                />
                            </div>

                            <div className="alert alert-info small py-2">
                              Tu contraseña será <strong>123456</strong>.
                            </div>
            
                            <button type="submit" className="btn btn-primary" disabled={cargando}>
                                {cargando ? 'Registrando...' : 'Registrarse'}
                            </button>

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