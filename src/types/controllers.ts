//definimos los tipos de apis que creamos en el tp2 de persistencia

export interface ControllersUser {
  id: string;
  nickName: string;
}

export interface ControllersTag {
  id: string;
  nombre: string;
}

export interface ControllersImage {
  id: string;
  url: string;
}

export interface ControllersComment {
  id: string;
  comentario: string;
  fecha: string;
  user?: ControllersUser | string;
  post?: string;
  visible?: boolean;
}

export interface ControllersPost {
  id: string;
  descripcion: string;
  fecha: string;
  user: ControllersUser;
  tags: ControllersTag[];
  images: ControllersImage[];
  comments?: ControllersComment[];
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