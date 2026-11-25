import { Link } from 'react-router';
import PostCard from '../components/PostCard';
import { usePosts } from '../hooks/usePosts';

const Inicio = () => {

    const { posts, cargando, error } = usePosts();
  const recientes = [...posts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);
   

    return (
        <>
            <section className="container pt-4 pt-md-5">
                <div className="hero-inicio rounded-4 p-4 p-md-5 text-white shadow-sm d-flex align-items-start gap-4">
                    <div>
                        <span className="badge rounded-pill text-bg-light mb-3">Comunidad UNAHUR</span>
                        <h1 className="display-5 fw-bold text-break">UnaHur Anti-Social Net</h1>
                        <p className="lead mb-4">
                            Un lugar para descubrir temas, compartir ideas y conectar con otras personas de la comunidad.
                        </p>
                        {/* logo en mobile: arriba del botón */}
                        <div className="text-center mb-4 d-md-none">
                            <img src="/logRed.jpg" alt="Logo de UnaHur Anti-Social Net" className="img-fluid logoInicio" />
                        </div>
                        <Link to="/publicaciones" className="btn btn-light rounded-pill px-4">
                            Explorar publicaciones
                        </Link>
                    </div>
                    {/* logo en desktop: a la derecha */}
                    <img
                        src="/logRed.jpg"
                        alt="Logo de UnaHur Anti-Social Net"
                        className="img-fluid logoInicio flex-shrink-0 ms-auto d-none d-md-block"
                    />
                </div>
            </section>

            <section className="container py-5">
                <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
                    <div>
                    <p className="text-uppercase text-muted small mb-1">Explorá</p>
                    <h2 className="h3 mb-0">Publicaciones de la comunidad</h2>
                    </div>
                    <Link to="/publicaciones" className="link-success">Ver todas las publicaciones</Link>
                </div>

                {cargando && <p className="text-muted">Cargando publicaciones...</p>}
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="row g-4">
                    {recientes.map((post) => (
                    <div className="col-12 col-lg-6" key={post.id}>
                        <PostCard {...post} />
                    </div>
                    ))}
                </div>
            </section>

            <section className="container pb-5">
                <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
                    <div>
                        <p className="text-uppercase text-white small mb-1">Para vos</p>
                        <h2 className="h3 mb-0 text-white">Publicaciones Destacadas</h2>
                    </div>
                    <Link to="/publicaciones" className="link-success">Ver todas las publicaciones</Link>
                </div>
    
            </section>

            <section className="container pb-5">
                <div className="hero-inicio text-white rounded-4  p-4 p-md-5">
                    <div className="row align-items-center g-4">
                        <div className="col-12 col-md-8">
                            <p className="text-uppercase small mb-1">Una comunidad para compartir</p>
                            <h2 className="h3">Cada idea puede iniciar una conversación</h2>
                            <p className="mb-0">
                                Conocé el espacio y descubrí cómo participar de las conversaciones de la comunidad.
                            </p>
                        </div>
                        <div className="col-12 col-md-4 d-flex gap-2 flex-wrap justify-content-md-end">
                            <Link to="/nosotros" className="btn btn-primary rounded-pill">Sobre nosotros</Link>
                            <Link to="/contacto" className="btn btn-primary rounded-pill">Contacto</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Inicio;

