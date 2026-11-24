import { request } from '../lib/apiClient';
import type { CrearPostInput, ControllerPost } from '../types/controllers';

export function listarPosts(): Promise<ControllerPost[]> {
  return request('/posts');
}

export function obtenerPost(id: string): Promise<ControllerPost> {
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