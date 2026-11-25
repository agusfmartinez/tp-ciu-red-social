import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import type { DatosToast } from "../hooks/toastHook";
import { useAuth } from "../hooks/useAuth";
import { crearPost, subirImagenes } from "../services/postsService";
import { listarTags } from "../services/tagsService";
import type { ControllerTag, CrearPostInput } from "../types/controllers";

interface NuevaPublicacionProps {
  mostrarToast: (datos: DatosToast) => void;
}

function NuevaPublicacion({ mostrarToast }: NuevaPublicacionProps) {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState("");
  const [etiquetasDisponibles, setEtiquetasDisponibles] = useState<
    ControllerTag[]
  >([]);
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState<
    string[]
  >([]);
  const [tagEscrito, setTagEscrito] = useState("");
  const [imagenes, setImagenes] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [archivos, setArchivos] = useState<File[]>([]);

  useEffect(() => {
    listarTags()
      .then(setEtiquetasDisponibles)
      .catch((cause: unknown) => {
        setError(
          cause instanceof Error
            ? cause.message
            : "No se pudieron cargar las etiquetas.",
        );
      });
  }, []);

  async function handleSubmit() {
    if (!usuario) {
      mostrarToast({
        titulo: "Iniciá sesión para publicar",
        mensaje: "Necesitás una cuenta para crear una publicación.",
        tipo: "danger",
        delay: 5000,
      });
      navigate("/login");
      return;
    }

    const textoDescripcion = descripcion.trim();
    if (textoDescripcion.length < 1 || textoDescripcion.length > 300) {
      setError("La descripción debe tener entre 1 y 300 caracteres.");
      return;
    }

    const urlsImagenes = imagenes
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url !== "");
    const datos: CrearPostInput = {
      descripcion: textoDescripcion,
      userId: usuario.id,
      tags: etiquetasSeleccionadas,
    };
    if (urlsImagenes.length > 0) {
      datos.images = urlsImagenes;
    }

    setError("");
    setEnviando(true);
    try {
      const post = await crearPost(datos);
      if (archivos.length > 0) {
        try {
          await subirImagenes(post.id, usuario.id, archivos);
        } catch {
          // post creado pero error al subir imagen
          mostrarToast({
            titulo: "Publicación creada sin imágenes",
            mensaje: "No se pudieron subir los archivos.",
            tipo: "warning",
            delay: 5000,
          });
          navigate("/post/" + post.id);
          return;
        }
      }

      mostrarToast({
        titulo: "Publicación creada",
        mensaje: "Tu publicación ya está disponible para la comunidad.",
        tipo: "success",
        delay: 5000,
      });
      navigate("/publicaciones");
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : "No se pudo crear la publicación. Intentá de nuevo.",
      );
      setEnviando(false);
    }
  }

  function agregarTag(nombre: string) {
    const escrito = nombre.trim();
    if (escrito.length < 2) return;

    // si ya existe (sin importar mayúsculas), usamos el nombre original
    const existente = etiquetasDisponibles.find((etiqueta) => etiqueta.nombre.toLowerCase() === escrito.toLowerCase());
    const tag = existente ? existente.nombre : escrito;

    if (etiquetasSeleccionadas.includes(tag)) return;
    if (etiquetasSeleccionadas.length >= 10) return;
    setEtiquetasSeleccionadas([...etiquetasSeleccionadas, tag]);
    setTagEscrito('');
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  const sugerencias = etiquetasDisponibles.filter(
    (etiqueta) =>
      etiqueta.nombre.toLowerCase().includes(tagEscrito.trim().toLowerCase()) &&
      !etiquetasSeleccionadas.includes(etiqueta.nombre),
  );
  const existeExacto = etiquetasDisponibles.some(
    (etiqueta) =>
      etiqueta.nombre.toLowerCase() === tagEscrito.trim().toLowerCase(),
  );

  return (
    <section className="container my-5" style={{ maxWidth: 760 }}>
      <h1 className="h2 mb-2">Nueva publicación</h1>
      <p className="text-muted mb-4">
        Compartí una idea, consulta o recurso con la comunidad.
      </p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
        className="card border-0 rounded-4 shadow-sm"
      >
        <div className="card-body p-4">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              ¿Qué querés compartir?
            </label>
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
            <label htmlFor="etiquetas" className="form-label">
              Etiquetas
            </label>
            <div className="position-relative flex-grow-1">
              <input
                id="etiquetas"
                className="form-control"
                placeholder="Escribí una etiqueta"
                autoComplete="off"
                value={tagEscrito}
                onChange={(event) => setTagEscrito(event.currentTarget.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    agregarTag(tagEscrito);
                  }
                }}
              />

              {tagEscrito.trim() !== "" && (
                <ul
                  className="list-group position-absolute w-100 shadow-sm mt-1"
                  style={{ zIndex: 10, maxHeight: 200, overflowY: "auto" }}
                >
                  {sugerencias.map((etiqueta) => (
                    <li key={etiqueta.id}>
                      <button
                        type="button"
                        className="list-group-item list-group-item-action"
                        onClick={() => agregarTag(etiqueta.nombre)}
                      >
                        {etiqueta.nombre}
                      </button>
                    </li>
                  ))}
                  {!existeExacto && tagEscrito.trim().length >= 2 && (
                    <li>
                      <button
                        type="button"
                        className="list-group-item list-group-item-action text-success"
                        onClick={() => agregarTag(tagEscrito)}
                      >
                        + Crear «{tagEscrito.trim()}»
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>

            <div className="d-flex flex-wrap gap-2 mt-2">
              {etiquetasSeleccionadas.map((tag) => (
                <span
                  key={tag}
                  className="badge rounded-pill text-bg-secondary d-flex align-items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    style={{ fontSize: "0.5rem" }}
                    aria-label={"Quitar " + tag}
                    onClick={() =>
                      setEtiquetasSeleccionadas(
                        etiquetasSeleccionadas.filter((t) => t !== tag),
                      )
                    }
                  />
                </span>
              ))}
            </div>
            <div className="form-text">
              Elegí una existente o escribí una nueva. Máximo 10.
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="imagenes" className="form-label">
              Imágenes (opcional)
            </label>
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

          <div className="mb-4">
            <label htmlFor="archivos" className="form-label">
              Subir archivos de imágenes (opcional)
            </label>
            <input
              id="archivos"
              type="file"
              className="form-control"
              accept="image/*"
              multiple
              onChange={(event) => {
                const nuevos = Array.from(event.currentTarget.files ?? []);
                setArchivos([...archivos, ...nuevos].slice(0, 10));
                event.currentTarget.value = "";
              }}
            />
            <div className="form-text">Hasta 10 imágenes, 5MB cada una.</div>
            {archivos.length > 0 && (
              <ul className="list-group mt-2">
                {archivos.map((archivo, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center gap-2"
                  >
                    <span className="text-truncate">{archivo.name}</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        setArchivos(archivos.filter((_, i) => i !== index))
                      }
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit" className="btn btn-dark" disabled={enviando}>
            {enviando ? "Publicando…" : "Publicar"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default NuevaPublicacion;
