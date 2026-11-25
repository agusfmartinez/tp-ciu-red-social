import { request } from '../lib/apiClient';
import type { CrearPostInput, ControllerPost } from '../types/controllers';
import { API_URL } from '../config/api';

export function listarPosts(): Promise<ControllerPost[]> {
  return request('/posts');
}

export function obtenerPost(id: string): Promise<ControllerPost> {
  return request('/posts/' + id);
}

export async function crearPost(datos: CrearPostInput): Promise<ControllerPost> {
  const respuesta = await request('/posts', {
    method: 'POST',
    //convertimos el objeto en formato json
    body: JSON.stringify(datos),
  });

  return respuesta.post;
}

export function listarPostsDeUsuario(userId: string): Promise<ControllerPost[]> {
  return request('/posts?userId=' + userId);
}

export async function subirImagenes(postId: string, userId: string, archivos: File[]) {
  const formData = new FormData();
  formData.append('userId', userId);
  archivos.forEach((archivo) => formData.append('images', archivo));

  const response = await fetch(API_URL + '/posts/' + postId + '/images/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('El post se creó, pero no se pudieron subir las imágenes.');
  }
}