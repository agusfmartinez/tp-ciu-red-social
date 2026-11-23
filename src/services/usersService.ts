import { request } from '../lib/apiClient';

export function listarUsuarios() {
  return request('/users');
}

export async function buscarOCrearUsuario(nickName: string) {
  const nick = nickName.trim().toLowerCase();
  const usuarios = await listarUsuarios();
  const existente = usuarios.find((u: any) => u.nickName === nick);

  if (existente) {
    return existente;
  }

  await request('/users', {
    method: 'POST',
    //convertimos el objeto en formato json
    body: JSON.stringify({ nickName: nick }),
  });

  const actualizados = await listarUsuarios();
  return actualizados.find((u: any) => u.nickName === nick);
}