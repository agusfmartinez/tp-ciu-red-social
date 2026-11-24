import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { ControllerUser } from "../types/controllers";
import { buscarUsuario, crearUsuario } from "../services/usersService";

// el TP pide una contraseña fija validada en el front (login simulado)
const PASSWORD_FIJA = "123456";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  // arranca con lo que haya en localStorage
  const [usuario, setUsuario] = useState<ControllerUser | null>(() => {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  function guardar(nuevoUsuario: ControllerUser) {
    setUsuario(nuevoUsuario);
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
  }

  async function ingresar(nickName: string, password: string) {
    const encontrado = await buscarUsuario(nickName);
    if (!encontrado || password !== PASSWORD_FIJA) {
      throw new Error("Credenciales incorrectas.");
    }
    guardar(encontrado);
  }

  async function registrarse(nickName: string) {
    // si el nick ya existe, el backend responde error y request() lo tira con su mensaje
    await crearUsuario(nickName);
    // el POST no devuelve el usuario, así que lo buscamos para tener su id y loguearlo
    const creado = await buscarUsuario(nickName);
    if (!creado) {
      throw new Error("La cuenta se creó, pero no se pudo iniciar sesión.");
    }
    guardar(creado);
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem("usuario");
  }

  return (
    <AuthContext.Provider value={{ usuario, ingresar, registrarse, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
