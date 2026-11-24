import { request } from '../lib/apiClient';
import type { CrearComentarioInput } from '../types/controllers';

// export function listarComentarios() {
//   return request('/comments');
// }

export function crearComentario(datos: CrearComentarioInput) {
  return request('/comments', {
    method: 'POST',
    //convertimos el objeto en formato json
    body: JSON.stringify(datos),
  });
}

// export function contarComentarios(comentarios: ControllerComment[]) {
//   const conteo: { [id: string]: number } = {};

//   comentarios.forEach((comentario) => {
//     if (comentario.visible) {
//       const id = comentario.post;
//       if (id) conteo[id] = (conteo[id] ?? 0) + 1;
//     }
//   });

//   return conteo;
// }