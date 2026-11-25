import { NavLink } from 'react-router';
import { useAuth } from '../hooks/useAuth';

function BottomNavBar() {

  const { usuario } = useAuth();

  return (
    <nav className="bottom-nav d-lg-none">
      <NavLink to="/" end className="bottom-nav-item" aria-label="Inicio">
        <span className="material-symbols-outlined">home</span>
      </NavLink>
      <NavLink to="/publicaciones" className="bottom-nav-item" aria-label="Publicaciones">
        <span className="material-symbols-outlined">dynamic_feed</span>
      </NavLink>
      <NavLink to="/nueva-publicacion" className="bottom-nav-item nueva" aria-label="Nueva publicación">
        <span className="material-symbols-outlined">add_circle</span>
      </NavLink>
      <NavLink to="/nosotros" className="bottom-nav-item" aria-label="Nosotros">
        <span className="material-symbols-outlined">groups</span>
      </NavLink>
      {usuario ? (
        <NavLink to="/perfil" className="bottom-nav-item" aria-label="Mi perfil">
          <span className="material-symbols-outlined">person</span>
        </NavLink>
      ) : (
        <NavLink to="/login" className="bottom-nav-item" aria-label="Iniciar sesión">
          <span className="material-symbols-outlined">account_circle</span>
        </NavLink>
      )}
    </nav>
  );
}

export default BottomNavBar;