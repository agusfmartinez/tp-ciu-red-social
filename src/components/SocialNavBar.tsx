import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useNavigate } from 'react-router';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../hooks/useAuth';

function SocialNavBar() {

  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('');
  }

  return (
    <Navbar expand="lg" className="navbar-estilos" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="mx-auto mx-lg-0">UnaHur Anti-Social Net</Navbar.Brand>
        <Navbar.Collapse id="social-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/publicaciones">Publicaciones</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-lg-center">
            <Link to="/nueva-publicacion" className="btn btn-light btn-sm text-nowrap align-self-lg-center ms-lg-3">
              + Nueva publicación
            </Link>
            {usuario ? (
              <NavDropdown
                title={`${usuario.nickName.toUpperCase()}`}
                id="dropdown-usuario"
                align="end"
                menuVariant="dark"
                className="ms-lg-3"
              >
                <NavDropdown.Item as={Link} to="/perfil">Mi perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Iniciar sesión</Nav.Link>
                <Nav.Link as={NavLink} to="/registro">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SocialNavBar;
