import { request } from '../lib/apiClient';
import type { CrearPostInput } from '../types/controllers';

export function listarPosts() {
  return request('/posts');
}

export function obtenerPost(id: string) {
  return request('/posts/' + id);
}

export async function crearPost(datos: CrearPostInput) {
  const respuesta = await request('/posts', {
    method: 'POST',
    //convertimos el objeto en formato json
    body: JSON.stringify(datos),
  });

  return respuesta.post;
}