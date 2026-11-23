import { Link } from 'react-router';

export type PostCardProps = {
  id: number | string;
  description: string;
  tags: string[];
  images: string[];
  visibleCommentsCount: number;
  createdAt: string;
  comments?: { id: number; author: string; text: string; createdAt: string }[];
};

function PostCard({
  id,
  description,
  tags,
  images,
  visibleCommentsCount,
  createdAt,
}: PostCardProps) {
  return (
    <article className="card h-100 border-0 rounded-4 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div>
            <p className="fw-semibold mb-0">Comunidad UNAHUR</p>
            <small className="text-muted">
              {new Date(createdAt).toLocaleDateString('es-AR')}
            </small>
          </div>
        </div>

        <p className="mb-3" style={{ whiteSpace: 'pre-line' }}>{description}</p>
        
        {images[0] && (
          <img
            src={images[0]}
            alt="Imagen de la publicación"
            className="img-fluid rounded-3 mb-3 w-100"
            style={{ maxHeight: 360, objectFit: 'cover' }}
          />
        )}

        <div className="d-flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span className="badge rounded-pill text-bg-light border" key={tag}>
              #{tag}
            </span>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center border-top pt-3">
          <small className="text-muted">
            {visibleCommentsCount} {visibleCommentsCount === 1 ? 'comentario visible' : 'comentarios visibles'}
          </small>
          <Link to={`/post/${id}`} className="btn btn-outline-success btn-sm rounded-pill px-3">
            Ver más
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
