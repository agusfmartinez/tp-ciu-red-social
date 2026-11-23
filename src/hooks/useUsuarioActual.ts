import { useState } from 'react';
import { buscarOCrearUsuario, buscarUsuario } from '../services/usersService';

// la password la validamos solo en el front para simular un login real
const password_fija = '123456';
const CLAVE = 'usuarioActual';

type UsuarioLocal = { id: string; nickName: string };

function leerDeStorage(): UsuarioLocal | null {
  const guardado = localStorage.getItem(CLAVE);
  return guardado ? JSON.parse(guardado) : null;
}

export function useUsuarioActual() {
  const [usuario, setUsuario] = useState<UsuarioLocal | null>(leerDeStorage);

  function guardar(encontrado: any) {
    const actual: UsuarioLocal = { id: encontrado.id, nickName: encontrado.nickName };
    localStorage.setItem(CLAVE, JSON.stringify(actual));
    setUsuario(actual);
    return actual;
  }

  async function ingresar(nickName: string, password: string) {
    if (password !== password_fija) {
      throw new Error('Contraseña incorrecta.');
    }

    const encontrado = await buscarUsuario(nickName);
    if (!encontrado) {
      throw new Error('Usuario no encontrado.');
    }

    return guardar(encontrado);
  }

  async function registrarse(nickName: string) {
    const creado = await buscarOCrearUsuario(nickName);
    return guardar(creado);
  }

  function salir() {
    localStorage.removeItem(CLAVE);
    setUsuario(null);
  }

  return { usuario, ingresar, registrarse, salir };
}