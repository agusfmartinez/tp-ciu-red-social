import { request } from '../lib/apiClient';
import type { ControllerUser } from '../types/controllers';

export function listarUsuarios(): Promise<ControllerUser[]> {
  return request('/users');
}

export async function buscarUsuario(nickName: string) {
  const nick = nickName.trim().toLowerCase();
  const usuarios = await listarUsuarios();
  return usuarios.find((u) => u.nickName === nick);
}

export function crearUsuario(nickName: string){
  return request('/users', {
    method:'POST',
    body: JSON.stringify({nickName: nickName.trim()}),
  });
}

export function obtenerUsuario(id: string): Promise<ControllerUser> {
  return request('/users/' + id);
}