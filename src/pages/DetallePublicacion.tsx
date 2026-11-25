import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { obtenerPost } from '../services/postsService';
import { urlImagen } from '../config/api';
import { mapearComentario } from '../lib/mappers';
import type { ControllerPost } from '../types/controllers';
import { useAuth } from '../hooks/useAuth';
import { crearComentario } from '../services/commentsService';

function DetallePublicacion() {
  const { id } = useParams();
  const [post, setPost] = useState<ControllerPost | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const { usuario } = useAuth();
  const [comentario, setComentario] = useState('');
  const [errorComentario, setErrorComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!id) return;
    obtenerPost(id)
      .then((datos) => setPost(datos))
      .catch((err) => setError(err instanceof Error ? err.message : 'No se pudo cargar la publicación.'))
      .finally(() => setCargando(false));
  }, [id, version]);

  if (cargando) {
    return <section className="container py-5"><p className="text-muted">Cargando publicación...</p></section>;
  }

  async function enviarComentario() {
    const texto = comentario.trim();
    if (texto === '') {
      setErrorComentario('El comentario no puede estar vacío.');
      return;
    }
    if (!usuario || !id) return;

    setErrorComentario('');
    setEnviando(true);
    try {
      await crearComentario({ comentario: texto, postId: id, userId: usuario.id });
      setComentario('');
      setVersion((v) => v + 1);
      setEnviando(false);
    } catch (err) {
      setErrorComentario(err instanceof Error ? err.message : 'No se pudo enviar el comentario.');
      setEnviando(false);
    }
  }

  if (error || !post) {
    return (
      <section className="container py-5">
        <h1 className="h3">Publicación no encontrada</h1>
        {error && <p className="text-muted">{error}</p>}
        <Link to="/publicaciones" className="btn btn-outline-success rounded-pill">Volver a publicaciones</Link>
      </section>
    );
  }

  const comentarios = (post.comments ?? []).map(mapearComentario);

  
  return (
    <section className="container py-5" style={{ maxWidth: 900 }}>
      <Link to="/publicaciones" className="btn btn-link text-success text-decoration-none px-0 mb-3">← Volver a publicaciones</Link>
      <article className="card border-0 rounded-4 shadow-sm">
        <div className="card-body p-4 p-md-5">
          <header className="mb-4">
            <Link to={`/usuario/${post.user.id}`} className="fw-semibold d-block link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">
              {post.user.nickName}
            </Link>
            <small className="text-muted">{new Date(post.fecha).toLocaleDateString('es-AR')}</small>
          </header>

          <p className="fs-5 mb-4" style={{ whiteSpace: 'pre-line' }}>{post.descripcion}</p>

          {post.images.length > 0 && (
            <div className="row g-3 mb-4">
              {post.images.map((image, index) => (
                <div className="col-12" key={image.id}>
                  <img src={urlImagen(image.url)} alt={`Imagen ${index + 1} de la publicación`} className="img-fluid rounded-3 w-100" style={{ maxHeight: 560, objectFit: 'contain', background: '#e2e2e2 url(/placeholder.svg) center / cover' }} onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}/>
                </div>
              ))}
            </div>
          )}

          <div className="d-flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => <span className="badge rounded-pill text-bg-light border" key={tag.id}>#{tag.nombre}</span>)}
          </div>

          <section className="border-top pt-4" aria-labelledby="comentarios-titulo">
            <h2 id="comentarios-titulo" className="h5 mb-3">Comentarios ({comentarios.length})</h2>

            
          {usuario ? (
              <form className="my-4" onSubmit={(e) => { e.preventDefault(); enviarComentario(); }} noValidate>
                <label htmlFor="comentario" className="form-label">Dejá tu comentario</label>
                <textarea
                  id="comentario"
                  rows={3}
                  maxLength={200}
                  className={`form-control ${errorComentario ? 'is-invalid' : ''}`}
                  value={comentario}
                  onChange={(e) => { setComentario(e.target.value); setErrorComentario(''); }}
                />
                <div className="invalid-feedback">{errorComentario}</div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <small className="text-muted">{comentario.length}/200</small>
                  <button type="submit" className="btn btn-success rounded-pill px-4" disabled={enviando}>
                    {enviando ? 'Enviando...' : 'Comentar'}
                  </button>
                </div>
              </form>
            ) : (
              <p className="mt-4 mb-0 text-muted">
                <Link to="/login" className="link-success">Iniciá sesión</Link> para comentar.
              </p>
            )}

            {comentarios.length ? (
              <ul className="list-unstyled mb-0">
                {comentarios.map((comentario) => (
                  <li className="border-bottom py-3" key={comentario.id}>
                    <div className="d-flex justify-content-between flex-wrap gap-2 mb-1">
                      <strong>{comentario.autor}</strong>
                      <small className="text-muted">{new Date(comentario.fecha).toLocaleString('es-AR')}</small>
                    </div>
                    <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{comentario.texto}</p>
                  </li>
                ))}
              </ul>
            ) : <p className="text-muted mb-0">Todavía no hay comentarios en esta publicación.</p>}
          </section>
        </div>
      </article>
    </section>
  );
}

export default DetallePublicacion;