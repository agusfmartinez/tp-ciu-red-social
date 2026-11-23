import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Publicaciones from "./pages/Publicaciones";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import ToastGeneral from "./components/Toast";
import { useToast } from "./hooks/toastHook";
import NuevaPublicacion from "./pages/NuevaPublicacion";
import BottomNavBar from "./components/BottomNavBar";

function App() {
  const { toast, mostrarToast, cerrarToast } = useToast();

  return (
    <>
      <ToastGeneral
        show={!!toast}
        titulo={toast?.titulo ?? ""}
        mensaje={toast?.mensaje ?? ""}
        tipo={toast?.tipo}
        onClose={cerrarToast}
        delay={toast?.delay}
      />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/publicaciones" element={<Publicaciones />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/nueva-publicacion" element={<NuevaPublicacion mostrarToast={mostrarToast} />} />
        </Routes>
      </main>
      <Footer />
      <BottomNavBar />
    </>
  );
}

export default App;

