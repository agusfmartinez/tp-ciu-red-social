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