import type { PostCardProps } from '../components/PostCard';
import { urlImagen } from '../config/api';
import type { ControllerComment, ControllerPost, ComentarioVista } from './api';

//Creamos el mapper para mapear la definición del controller con la definicion de postCard

export function mapearPost(post: ControllerPost): PostCardProps {
  return {
    id: post.id,
    description: post.descripcion,
    createdAt: post.fecha,
    tags: (post.tags ?? []).map((tag) => tag.nombre),
    images: (post.images ?? []).map((image) => urlImagen(image.url)),
    visibleCommentsCount: post.comments?.length ?? 0,
  };
}

export function mapearComentario(comentario: ControllerComment): ComentarioVista {
  const usuario = comentario.user;

  return {
    id: comentario.id,
    texto: comentario.comentario,
    fecha: comentario.fecha,
    autor:
      typeof usuario === 'string'
        ? usuario
        : (usuario?.nickName ?? 'Usuario desconocido'),
  };
}