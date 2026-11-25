import { useEffect, useState } from 'react';
import { Link, Navigate, useParams  } from 'react-router';
import PostCard, { type PostCardProps } from '../components/PostCard';
import { useAuth } from '../hooks/useAuth';
import { listarPostsDeUsuario } from '../services/postsService';
import { mapearPost } from '../lib/mappers';
import { obtenerUsuario } from '../services/usersService';

function Perfil() {
  const { id } = useParams();
  const { usuario } = useAuth();
  const [nickName, setNickName] = useState('');
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const idPerfil = id ?? usuario?.id;
  const esMiPerfil = usuario !== null && idPerfil === usuario.id;

  useEffect(() => {
    if (!idPerfil) return;
    
    async function cargar(idBuscado: string){
        try {
            const datosUsuario = await obtenerUsuario(idBuscado)
            const datosPosts = await listarPostsDeUsuario(idBuscado)
            setNickName(datosUsuario.nickName)
            setPosts(datosPosts.map(mapearPost))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo cargar el perfil.')
        }
        setCargando(false)
    }

    cargar(idPerfil)
  }, [idPerfil]);

  if (!idPerfil) {
    return <Navigate to="/login" replace />;
  }

  const ordenados = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <section className="container py-5">
      <div className="card border-0 rounded-4 shadow-sm mx-auto" style={{ maxWidth: '32rem' }}>
        <div className="card-body p-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div>
            <h1 className="h3 fw-bold mb-3">Mi perfil</h1>
            <h1 className="h4 fw-bold mb-0">{nickName}</h1>
            <p className="text-muted small mb-4">
              {cargando ? 'Cargando...' : `${posts.length} publicaciones`}
            </p>
            <Link to="/publicaciones" className="btn btn-primary rounded-pill">
              Volver a publicaciones
            </Link>
          </div>
        </div>
      </div>

      <h2 className="h5 mb-3">{esMiPerfil ? 'Mis publicaciones' : 'Publicaciones'}</h2>

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
            <h3 className="h6">{esMiPerfil ? 'Todavía no publicaste nada' : 'Este usuario todavía no publicó nada'}</h3>
            {esMiPerfil && (
                <Link to="/nueva-publicacion" className="btn btn-success rounded-pill mt-2">Crear publicación</Link>
            )}
          </div>
        )
      )}
    </section>
  );
}

export default Perfil;