function Nosotros() {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Sobre la comunidad</h1>
        <h3 className="text-primary">UnaHur Anti-Social Net</h3>
        <p className="lead">
          Un espacio para compartir ideas y conectar con otras personas de la UNAHUR.
        </p>
      </div>

      <div className="row align-items-center">
        <div className="col-12 col-md-6">
          <h2>¿Qué es esta red?</h2>
          <p>
            UnaHur Anti-Social Net es una red social donde podés explorar publicaciones
            de la comunidad, compartir lo que pensás y conversar a través de comentarios.
          </p>
          <p>
            Las publicaciones pueden incluir imágenes y etiquetas para que sea más fácil
            encontrar temas que te interesan.
          </p>
        </div>

        <div className="col-12 col-md-6">
          <h2>Nuestra idea</h2>
          <p>
            Queremos ofrecer un lugar sencillo para expresarse, descubrir distintas
            perspectivas y mantener conversaciones con respeto dentro de la comunidad.
          </p>
        </div>
      </div>

      <hr className="my-4" />

      <div className="text-center">
        <h2>¿Qué podés hacer?</h2>
        <div className="row mt-4">
          <div className="col-12 col-md-4 mb-3">
            <h4>✍️ Compartir</h4>
            <p>Publicá tus ideas para que otras personas puedan leerlas.</p>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <h4>💬 Conversar</h4>
            <p>Comentá las publicaciones y participá de la charla.</p>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <h4>🏷️ Descubrir</h4>
            <p>Explorá publicaciones usando sus etiquetas e imágenes.</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-5 p-4 bg-light rounded">
        <h3 className="text-primary">UnaHur Anti-Social Net</h3>
        <p className="mb-0">Una comunidad para compartir lo que pasa en la UNAHUR.</p>
      </div>
    </div>
  );
}

export default Nosotros;
