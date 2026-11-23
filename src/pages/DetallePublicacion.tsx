import { Link, useParams } from 'react-router';
import { publicaciones } from './Publicaciones';

function DetallePublicacion() {
  const { id } = useParams();
  const publicacion = publicaciones.find((item) => String(item.id) === id);

  if (!publicacion) {
    return (
      <section className="container py-5">
        <h1 className="h3">Publicación no encontrada</h1>
        <Link to="/publicaciones" className="btn btn-outline-success rounded-pill">Volver a publicaciones</Link>
      </section>
    );
  }

  const comentarios = publicacion.comments ?? [];

  return (
    <section className="container py-5" style={{ maxWidth: 900 }}>
      <Link to="/publicaciones" className="btn btn-link text-success text-decoration-none px-0 mb-3">← Volver a publicaciones</Link>
      <article className="card border-0 rounded-4 shadow-sm">
        <div className="card-body p-4 p-md-5">
          <header className="mb-4">
            <p className="fw-semibold mb-0">Comunidad UNAHUR</p>
            <small className="text-muted">{new Date(publicacion.createdAt).toLocaleDateString('es-AR')}</small>
          </header>

          <p className="fs-5 mb-4" style={{ whiteSpace: 'pre-line' }}>{publicacion.description}</p>

          {publicacion.images.length > 0 && (
            <div className="row g-3 mb-4">
              {publicacion.images.map((image, index) => (
                <div className="col-12" key={`${image}-${index}`}>
                  <img src={image} alt={`Imagen ${index + 1} de la publicación`} className="img-fluid rounded-3 w-100" style={{ maxHeight: 560, objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          )}

          <div className="d-flex flex-wrap gap-2 mb-4">
            {publicacion.tags.map((tag) => <span className="badge rounded-pill text-bg-light border" key={tag}>#{tag}</span>)}
          </div>

          <section className="border-top pt-4" aria-labelledby="comentarios-titulo">
            <h2 id="comentarios-titulo" className="h5 mb-3">Comentarios ({comentarios.length})</h2>
            {comentarios.length ? (
              <ul className="list-unstyled mb-0">
                {comentarios.map((comentario) => (
                  <li className="border-bottom py-3" key={comentario.id}>
                    <div className="d-flex justify-content-between flex-wrap gap-2 mb-1">
                      <strong>{comentario.author}</strong>
                      <small className="text-muted">{new Date(comentario.createdAt).toLocaleString('es-AR')}</small>
                    </div>
                    <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{comentario.text}</p>
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
