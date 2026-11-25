import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router';
import PostCard, { type PostCardProps } from '../components/PostCard';
import { useAuth } from '../hooks/useAuth';
import { listarPostsDeUsuario } from '../services/postsService';
import { mapearPost } from '../lib/mappers';

function Perfil() {
  const { usuario } = useAuth();
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!usuario) return;
    listarPostsDeUsuario(usuario.id)
      .then((datos) => {
        setPosts(datos.map(mapearPost));
        setCargando(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'No se pudieron cargar tus publicaciones.');
        setCargando(false);
      });
  }, [usuario]);

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  const ordenados = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <section className="container py-5">
      <div className="card border-0 rounded-4 shadow-sm mb-4">
        <div className="card-body p-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div>
            <p className="text-uppercase text-muted small mb-1">Mi perfil</p>
            <h1 className="h3 fw-bold mb-0">{usuario.nickName}</h1>
            <small className="text-muted">
              {cargando ? 'Cargando...' : `${posts.length} publicaciones`}
            </small>
          </div>
        </div>
      </div>

      <h2 className="h5 mb-3">Mis publicaciones</h2>

      {cargando && <p className="text-muted">Cargando publicaciones...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!cargando && !error && (
        ordenados.length > 0 ? (
          <div className="row g-4">
            {ordenados.map((post) => (
              <div className="col-12 col-lg-6" key={post.id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-4 p-5 text-center">
            <h3 className="h6">Todavía no publicaste nada</h3>
            <Link to="/nueva-publicacion" className="btn btn-success rounded-pill mt-2">Crear publicación</Link>
          </div>
        )
      )}
    </section>
  );
}

export default Perfil;