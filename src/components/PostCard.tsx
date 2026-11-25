import { Link } from 'react-router';

export type PostCardProps = {
  id: string;
  author: string;
  authorId: string;
  description: string;
  tags: string[];
  images: string[];
  visibleCommentsCount: number;
  createdAt: string;
};

function PostCard({ id, author, authorId, description, tags, images, visibleCommentsCount, createdAt }: PostCardProps) {
  return (
    <article className="card h-100 border-0 rounded-4 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div>
            <Link to={`/usuario/${authorId}`} className="fw-semibold d-block link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">
              {author}
            </Link>
            <small className="text-muted">
              {new Date(createdAt).toLocaleDateString('es-AR')}
            </small>
          </div>
        </div>

        <p className="mb-3" style={{ whiteSpace: 'pre-line' }}>{description}</p>
        
        <img
          src={images[0] ?? '/placeholder.svg'}
          alt="Imagen de la publicación"
          className="img-fluid rounded-3 mb-3 w-100"
          style={{ height: 220, objectFit: 'cover', background: '#e2e2e2 url(/placeholder.svg) center / cover', }}
          onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
        />

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
          <Link to={`/post/${id}`} className="btn btn-primary btn-sm rounded-pill px-3">
            Ver más
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
