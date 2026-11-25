import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import type { DatosToast } from '../hooks/toastHook';
import { useAuth } from '../hooks/useAuth';
import { crearPost } from '../services/postsService';
import { listarTags } from '../services/tagsService';
import type { ControllerTag, CrearPostInput  } from '../types/controllers';

interface NuevaPublicacionProps {
  mostrarToast: (datos: DatosToast) => void;
}

function NuevaPublicacion({ mostrarToast }: NuevaPublicacionProps) {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState('');
  const [etiquetasDisponibles, setEtiquetasDisponibles] = useState<ControllerTag[]>([]);
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState<string[]>([]);
  const [imagenes, setImagenes] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    listarTags()
      .then(setEtiquetasDisponibles)
      .catch((cause: unknown) => {
        setError(cause instanceof Error ? cause.message : 'No se pudieron cargar las etiquetas.');
      });
  }, []);

  async function handleSubmit() {
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

    const textoDescripcion = descripcion.trim();
    if (textoDescripcion.length < 1 || textoDescripcion.length > 300) {
      setError('La descripción debe tener entre 1 y 300 caracteres.');
      return;
    }

    const urlsImagenes = imagenes.split('\n').map((url) => url.trim()).filter((url) => url !== '');
    const datos: CrearPostInput = {
      descripcion: textoDescripcion,
      userId: usuario.id,
      tags: etiquetasSeleccionadas,
    };
    if (urlsImagenes.length > 0) {
      datos.images = urlsImagenes;
    }

    setError('');
    setEnviando(true);
    try {
      await crearPost(datos);
      mostrarToast({
        titulo: 'Publicación creada',
        mensaje: 'Tu publicación ya está disponible para la comunidad.',
        tipo: 'success',
        delay: 5000,
      });
      navigate('/publicaciones');
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : 'No se pudo crear la publicación. Intentá de nuevo.');
      setEnviando(false);
    }
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
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
              minLength={1}
              maxLength={300}
              placeholder="Escribí el contenido de tu publicación..."
              value={descripcion}
              onChange={(event) => setDescripcion(event.currentTarget.value)}
              required
            />
            <div className="form-text text-end">{descripcion.length}/300</div>
          </div>

          <div className="mb-3">
            <label htmlFor="etiquetas" className="form-label">Etiquetas</label>
            <select
              id="etiquetas"
              name="etiquetas"
              className="form-select"
              multiple
              value={etiquetasSeleccionadas}
              onChange={(event) => setEtiquetasSeleccionadas(Array.from(event.currentTarget.selectedOptions, (option) => option.value))}
              aria-describedby="etiquetas-ayuda"
            >
              {etiquetasDisponibles.map((etiqueta) => (
                <option key={etiqueta.id} value={etiqueta.nombre}>{etiqueta.nombre}</option>
              ))}
            </select>
            <div id="etiquetas-ayuda" className="form-text">Podés seleccionar varias etiquetas.</div>
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
            <div className="form-text">Pegá una URL pública por línea.</div>
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



