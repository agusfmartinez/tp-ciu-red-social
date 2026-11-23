import { createContext } from "react";
import type { ControllerUser } from "../types/controllers";

export interface AuthContextType {
  usuario: ControllerUser | null;
  ingresar: (nickName: string, password: string) => Promise<void>;
  registrarse: (nickName: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
