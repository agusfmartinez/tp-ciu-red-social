import { createContext } from "react";
import type { ControllerUser } from "../types/controllers";

export interface AuthContextType {
  usuario: ControllerUser | null;
  login: (usuario: ControllerUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
