import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { useProductos } from '../hooks/productosHook';
import { useCategorias } from '../hooks/categoriasHook';
import { Link } from 'react-router';

const Inicio = ({ agregarAlCarrito, carrito }) => {
    const categorias = useCategorias();
    const productos = useProductos();

    return (
        <>
            <section className="container pt-4 pt-md-5">
                <div className="rounded-4 p-4 p-md-5 text-white shadow-sm" style={{ background: 'linear-gradient(120deg, #134C4A, #1D7874)' }}>
                    <span className="badge rounded-pill text-bg-light mb-3">Comunidad UNAHUR</span>
                    <h1 className="display-5 fw-bold">UnaHur Anti-Social Net</h1>
                    <p className="lead col-lg-8 mb-4">
                        Un lugar para descubrir temas, compartir ideas y conectar con otras personas de la comunidad.
                    </p>
                    <Link to="/productos" className="btn btn-light rounded-pill px-4">
                        Explorar novedades
                    </Link>
                </div>
            </section>

            <section className="container py-5">
                <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
                    <div>
                        <p className="text-uppercase text-muted small mb-1">Explorá</p>
                        <h2 className="h3 mb-0">Novedades de la comunidad</h2>
                    </div>
                </div>
                <div className="row py-2">
                    {categorias.map((c) => (
                        <div key={c.id} className="col-6 col-md-4 col-lg-2 pb-3">
                            <CategoryCard nombre={c.categoria} imagen={c.imagen} />
                        </div>
                    ))}
                </div>
            </section>

            <section className="container pb-5">
                <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
                    <div>
                        <p className="text-uppercase text-muted small mb-1">Para vos</p>
                        <h2 className="h3 mb-0">Novedades Destacadas</h2>
                    </div>
                    <Link to="/productos" className="link-success">Ver todas las novedades</Link>
                </div>
                <div className="row py-2">
                    {productos
                        .filter((producto) => producto.destacado)
                        .slice(0, 4)
                        .map((producto) => {
                            const productoEnCarrito = carrito.find(
                                item => item.id === producto.id
                            );
                            const stockDisponible = producto.stock - (
                                productoEnCarrito ? productoEnCarrito.cantidad : 0
                            );

                            return (
                                <div key={producto.id} className="col-12 col-sm-6 col-lg-3 pb-3">
                                    <ProductCard
                                        id={producto.id}
                                        nombre={producto.nombre}
                                        precio={producto.precio}
                                        agregar={() => agregarAlCarrito(producto)}
                                        categoria={producto.categoria}
                                        stock={stockDisponible}
                                        imagen={producto.imagen}
                                    />
                                </div>
                            );
                        })}
                </div>
            </section>

            <section className="container pb-5">
                <div className="rounded-4 border bg-white p-4 p-md-5">
                    <div className="row align-items-center g-4">
                        <div className="col-12 col-md-8">
                            <p className="text-uppercase text-muted small mb-1">Una comunidad para compartir</p>
                            <h2 className="h3">Cada idea puede iniciar una conversación</h2>
                            <p className="mb-0">
                                Conocé el espacio y descubrí cómo participar de las conversaciones de la comunidad.
                            </p>
                        </div>
                        <div className="col-12 col-md-4 d-flex gap-2 flex-wrap justify-content-md-end">
                            <Link to="/nosotros" className="btn btn-outline-success rounded-pill">Sobre nosotros</Link>
                            <Link to="/contacto" className="btn btn-success rounded-pill">Contacto</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Inicio;
