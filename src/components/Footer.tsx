import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="py-4 mt-5 d-none d-lg-block">
      <Container className="d-flex justify-content-between align-items-baseline">
        <p className="mb-0 fw-bold">UnaHur Anti-Social Net</p>
        <p className="mb-0 footer-copyright">Copyright © 2026 PedidoSimulator. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
