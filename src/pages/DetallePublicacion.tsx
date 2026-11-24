import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { obtenerPost } from '../services/postsService';
import { urlImagen } from '../config/api';
import { mapearComentario } from '../lib/mappers';
import type { ControllerPost } from '../types/controllers';

function DetallePublicacion() {
  const { id } = useParams();
  const [post, setPost] = useState<ControllerPost | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    obtenerPost(id)
      .then((datos) => setPost(datos))
      .catch((err) => setError(err instanceof Error ? err.message : 'No se pudo cargar la publicación.'))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return <section className="container py-5"><p className="text-muted">Cargando publicación...</p></section>;
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
            <p className="fw-semibold mb-0">{post.user.nickName}</p>
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