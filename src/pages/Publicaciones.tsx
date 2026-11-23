import { useState } from 'react';
import { useSearchParams } from 'react-router';
import PostCard, { type PostCardProps } from '../components/PostCard';

// Datos temporales borrar cuando tengamos backend
export const publicaciones: PostCardProps[] = [
  {
    id: 1,
    description: '¿Qué espacio de la UNAHUR recomiendan para estudiar entre clases?',
    tags: ['UNAHUR', 'Estudio'],
    images: [],
    visibleCommentsCount: 4,
    createdAt: '2026-11-18T14:30:00',
    comments: [
      {
        id: 1, author: 'Lucía',
        text: 'La biblioteca tiene espacios tranquilos en el primer piso.',
        createdAt: '2026-11-18T15:00:00'
      },
      {
        id: 2, author: 'Tomás',
        text: 'También recomiendo el patio cuando está lindo.',
        createdAt: '2026-11-18T15:20:00'
      },
      { id: 3, author: 'Micaela', text: 'Hay mesas disponibles cerca del buffet.', createdAt: '2026-11-18T16:10:00' },
      {
        id: 4, author: 'Juan',
        text: 'El espacio de estudio del segundo piso suele ser silencioso.',
        createdAt: '2026-11-18T17:05:00'
      },
    ],
  },
  {
    id: 2,
    description: 'Compartamos recursos y consejos para preparar los próximos parciales.',
    tags: ['Estudio', 'Comunidad'],
    images: [],
    visibleCommentsCount: 2,
    createdAt: '2026-11-17T11:00:00',
    comments: [
      {
        id: 1, author: 'Sofía',
        text: 'Los resúmenes compartidos en el grupo ayudan un montón.',
        createdAt: '2026-11-17T12:00:00'
      },
      {
        id: 2, author: 'Nicolás',
        text: 'Podemos armar una guía entre todos.',
        createdAt: '2026-11-17T13:30:00'
      },
    ],
  },
  {
    id: 3,
    description: '¿Qué actividad o proyecto de la universidad les gustaría conocer mejor?',
    tags: ['Ideas', 'UNAHUR'],
    images: [],
    visibleCommentsCount: 0,
    createdAt: '2026-11-16T09:15:00',
    comments: [],
  },
];

function Publicaciones() {
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('recientes');
  const [searchParams, setSearchParams] = useSearchParams();
  const etiquetaSeleccionada = searchParams.get('tag') ?? '';

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
    <section className="container py-5">
      <div className="mb-4">
        <p className="text-uppercase text-muted small mb-1">Feed de la comunidad</p>
        <h1 className="display-6 fw-bold">Publicaciones</h1>
        <p className="text-muted">Explorá publicaciones y conversaciones de la UNAHUR.</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="buscar-publicaciones">Buscar publicaciones</label>
          <input
            id="buscar-publicaciones"
            type="search"
            className="form-control"
            placeholder="Buscar en las descripciones..."
            value={busqueda}
            onChange={(event) => setBusqueda(event.currentTarget.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <label className="form-label" htmlFor="filtrar-etiqueta">Etiqueta</label>
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
        <div className="col-12 col-md-3">
          <label className="form-label" htmlFor="ordenar-publicaciones">Ordenar por</label>
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

      {publicacionesFiltradas.length > 0 ? (
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
      )}
    </section>
  );
}

export default Publicaciones;
