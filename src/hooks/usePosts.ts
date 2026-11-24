import { useEffect, useState } from 'react';
import { listarPosts } from '../services/postsService';
import { mapearPost } from '../lib/mappers';
import type { PostCardProps } from '../components/PostCard';

export function usePosts() {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    listarPosts()
      .then((datos) => setPosts(datos.map(mapearPost)))
      .catch((err) => setError(err instanceof Error ? err.message : 'No se pudieron cargar las publicaciones.'))
      .finally(() => setCargando(false));
  }, []);

  return { posts, cargando, error };
}