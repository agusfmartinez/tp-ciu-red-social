import { API_URL } from '../config/api'

export async function request(path: string, options: RequestInit = {}) {
  const response = await fetch(API_URL + path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message ?? 'Error en la API');
  }

  return data;
}