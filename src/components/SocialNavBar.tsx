import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router';

function SocialNavBar() {
  return (
    <Navbar expand="lg" className="navbar-estilos" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">UnaHur Anti-Social Net</Navbar.Brand>
        <Navbar.Toggle aria-controls="social-navbar" />
        <Navbar.Collapse id="social-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/publicaciones">Publicaciones</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Link to="/nueva-publicacion" className="btn btn-light btn-sm text-nowrap align-self-lg-center ms-lg-3">
              + Nueva publicación
            </Link>
            <Nav.Link as={NavLink} to="/login">Iniciar sesión</Nav.Link>
            <Nav.Link as={NavLink} to="/registro">Registrarse</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SocialNavBar;
