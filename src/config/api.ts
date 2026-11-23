export const API_URL = import.meta.env.VITE_API_URL as string;

// la función de abajo es para las imagenes que se suben con Multer

export function urlImagen(url: string) {
  if (url.startsWith('http')) return url;
  return API_URL + url;
}