import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { DatosToast } from '../hooks/toastHook';
import { useAuth } from '../hooks/useAuth';
import { crearPost } from '../services/postsService';

interface NuevaPublicacionProps {
  mostrarToast: (datos: DatosToast) => void;
}

function NuevaPublicacion({ mostrarToast }: NuevaPublicacionProps) {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState('');
  const [etiquetas, setEtiquetas] = useState('');
  const [imagenes, setImagenes] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!usuario) {
      mostrarToast({
        titulo: 'Iniciá sesión para publicar',
        mensaje: 'Necesitás una cuenta para crear una publicación.',
        tipo: 'danger',
        delay: 5000,
      });
      navigate('/login');
      return;
    }

    const tags = [...new Set(etiquetas.split(',').map((tag) => tag.trim()).filter(Boolean))];
    const urlsImagenes = imagenes.split('\n').map((url) => url.trim()).filter(Boolean);
    if (urlsImagenes.some((url) => {
      try {
        const parsed = new URL(url);
        return parsed.protocol !== 'http:' && parsed.protocol !== 'https:';
      } catch {
        return true;
      }
    })) {
      setError('Ingresá URLs válidas que comiencen con http:// o https://.');
      return;
    }

    setError('');
    setEnviando(true);
    void crearPost({ descripcion: descripcion.trim(), userId: usuario.id, tags, images: urlsImagenes })
      .then(() => {
        mostrarToast({
          titulo: 'Publicación creada',
          mensaje: 'Tu publicación ya está disponible para la comunidad.',
          tipo: 'success',
          delay: 5000,
        });
        navigate('/publicaciones');
      })
      .catch((cause: unknown) => {
        setError(cause instanceof Error ? cause.message : 'No se pudo crear la publicación. Intentá de nuevo.');
      })
      .finally(() => setEnviando(false));
  }

  return (
    <section className="container my-5" style={{ maxWidth: 760 }}>
      <h1 className="h2 mb-2">Nueva publicación</h1>
      <p className="text-muted mb-4">Compartí una idea, consulta o recurso con la comunidad.</p>

      <form onSubmit={(event) => { event.preventDefault(); handleSubmit(); }} className="card border-0 rounded-4 shadow-sm">
        <div className="card-body p-4">
          {error && <div className="alert alert-danger" role="alert">{error}</div>}

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">¿Qué querés compartir?</label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="form-control"
              rows={5}
              maxLength={2000}
              placeholder="Escribí el contenido de tu publicación..."
              value={descripcion}
              onChange={(event) => setDescripcion(event.currentTarget.value)}
              required
            />
            <div className="form-text text-end">{descripcion.length}/2000</div>
          </div>

          <div className="mb-3">
            <label htmlFor="etiquetas" className="form-label">Etiquetas</label>
            <input
              id="etiquetas"
              name="etiquetas"
              className="form-control"
              placeholder="Por ejemplo: Estudio, UNAHUR"
              value={etiquetas}
              onChange={(event) => setEtiquetas(event.currentTarget.value)}
            />
            <div className="form-text">Separá las etiquetas con comas.</div>
          </div>

          <div className="mb-4">
            <label htmlFor="imagenes" className="form-label">Imágenes (opcional)</label>
            <textarea
              id="imagenes"
              name="imagenes"
              className="form-control"
              rows={2}
              placeholder="Pegá una URL por línea"
              value={imagenes}
              onChange={(event) => setImagenes(event.currentTarget.value)}
            />
            <div className="form-text">Usá enlaces públicos que comiencen con http:// o https://.</div>
          </div>

          <button type="submit" className="btn btn-dark" disabled={enviando}>
            {enviando ? 'Publicando…' : 'Publicar'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default NuevaPublicacion;



