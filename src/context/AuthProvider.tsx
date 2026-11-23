import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { ControllerUser } from "../types/controllers";

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({children}: AuthProviderProps){
    // arranca con lo que haya en local storage
    const [usuario, setUsuario] = useState<ControllerUser | null>(() => {
        const guardado = localStorage.getItem("usuario")
        return guardado ? JSON.parse(guardado) : null
    });

    function login(nuevoUsuario: ControllerUser){
        setUsuario(nuevoUsuario);
        localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
    }

    function logout(){
        setUsuario(null)
        localStorage.removeItem("usuario")
    }

    return (
        <AuthContext.Provider value={{usuario, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider