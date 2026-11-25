import { useState } from 'react';
import { useSearchParams } from 'react-router';
import PostCard from '../components/PostCard';
import { usePosts } from '../hooks/usePosts';

function Publicaciones() {
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('recientes');
  const [searchParams, setSearchParams] = useSearchParams();
  const etiquetaSeleccionada = searchParams.get('tag') ?? '';
  const { posts: publicaciones, cargando, error } = usePosts();

  const etiquetas = Array.from(
    new Set(publicaciones.flatMap((publicacion) => publicacion.tags)),
  ).sort();

  const busquedaNormalizada = busqueda.trim().toLowerCase();
  const publicacionesFiltradas = [...publicaciones]
    .filter((publicacion) =>
      publicacion.description.toLowerCase().includes(busquedaNormalizada),
    )
    .filter((publicacion) =>
      !etiquetaSeleccionada || publicacion.tags.includes(etiquetaSeleccionada),
    )
    .sort((a, b) => {
      if (orden === 'comentarios') {
        return b.visibleCommentsCount - a.visibleCommentsCount;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  function cambiarEtiqueta(valor: string) {
    if (valor) {
      setSearchParams({ tag: valor });
    } else {
      setSearchParams({});
    }
  }

  return (   
    <section className="container py-4 py-md-5">
      <div className="mb-3 mb-md-4">
        <p className="text-uppercase text-muted small mb-1">Feed de la comunidad</p>
        <h1 className="display-6 fw-bold">Publicaciones</h1>
        <p className="text-muted d-none d-md-block">Explorá publicaciones y conversaciones de la UNAHUR.</p>
      </div>

      <div className="row g-2 g-md-3 mb-4">
        <div className="col-12 col-md-6">
          <label className="form-label d-none d-md-block" htmlFor="buscar-publicaciones">Buscar publicaciones</label>
          <input
            id="buscar-publicaciones"
            type="search"
            className="form-control"
            placeholder="Buscar en las descripciones..."
            value={busqueda}
            onChange={(event) => setBusqueda(event.currentTarget.value)}
          />
        </div>
        <div className="col-6 col-md-3">
          <label className="form-label d-none d-md-block" htmlFor="filtrar-etiqueta">Etiqueta</label>
          <select
            id="filtrar-etiqueta"
            className="form-select"
            value={etiquetaSeleccionada}
            onChange={(event) => cambiarEtiqueta(event.currentTarget.value)}
          >
            <option value="">Todas las etiquetas</option>
            {etiquetas.map((etiqueta) => (
              <option key={etiqueta} value={etiqueta}>{etiqueta}</option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-3">
          <label className="form-label d-none d-md-block" htmlFor="ordenar-publicaciones">Ordenar por</label>
          <select
            id="ordenar-publicaciones"
            className="form-select"
            value={orden}
            onChange={(event) => setOrden(event.currentTarget.value)}
          >
            <option value="recientes">Más recientes</option>
            <option value="comentarios">Más comentadas</option>
          </select>
        </div>
      </div>

      {cargando && <p className="text-muted">Cargando publicaciones...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!cargando && !error && (
        publicacionesFiltradas.length > 0 ? (
          <div className="row g-4">
            {publicacionesFiltradas.map((publicacion) => (
              <div className="col-12 col-lg-6" key={publicacion.id}>
                <PostCard {...publicacion} />
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-4 p-5 text-center">
            <h2 className="h5">No encontramos publicaciones</h2>
            <p className="text-muted mb-0">Probá cambiar la búsqueda o elegir otra etiqueta.</p>
          </div>
        )
      )}

    </section>
  );
}

export default Publicaciones;
