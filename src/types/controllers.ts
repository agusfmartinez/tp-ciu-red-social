//definimos los tipos de apis que creamos en el tp2 de persistencia

export interface ControllerUser {
  id: string;
  nickName: string;
}

export interface ControllerTag {
  id: string;
  nombre: string;
}

export interface ControllerImage {
  id: string;
  url: string;
}

export interface ControllerComment {
  id: string;
  comentario: string;
  fecha: string;
  user?: ControllerUser | string;
  post?: string;
  visible?: boolean;
}

export interface ControllerPost {
  id: string;
  descripcion: string;
  fecha: string;
  user: ControllerUser;
  tags: ControllerTag[];
  images: ControllerImage[];
  comments?: ControllerComment[];
}

export interface CrearPostInput {
  descripcion: string;
  userId: string;
  tags?: string[];
  images?: string[];
}

export interface CrearComentarioInput {
  comentario: string;
  postId: string;
  userId: string;
}

export interface ComentarioVista {
  id: string;
  texto: string;
  fecha: string;
  autor: string;
}