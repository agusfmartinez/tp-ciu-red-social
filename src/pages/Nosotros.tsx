function Nosotros() {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="">Sobre la comunidad</h1>
        <h3 className="textos-inicio-publi-destacadas">UnaHur Anti-Social Net</h3>
        <p className="lead">
          Un espacio para compartir ideas y conectar con otras personas de la UNAHUR.
        </p>
      </div>

      <div className="row align-items-start">
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
            <h4>Compartir</h4>
            <p>Publicá tus ideas para que otras personas puedan leerlas.</p>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <h4>Conversar</h4>
            <p>Comentá las publicaciones y participá de la charla.</p>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <h4>Descubrir</h4>
            <p>Explorá publicaciones usando sus etiquetas e imágenes.</p>
          </div>
        </div>
      </div>

      <div className="hero-inicio rounded-4 p-4 p-md-5 text-white shadow-sm d-flex align-items-center gap-4 mt-5">
        <div>
          <h3 className="fw-bold">UnaHur Anti-Social Net</h3>
          <p className="mb-0">Una comunidad para compartir lo que pasa en la UNAHUR.</p>
          {/* logo en mobile: abajo del texto */}
          <div className="text-center mt-4 d-md-none">
            <img src="/logRed.jpg" alt="Logo de UnaHur Anti-Social Net" className="img-fluid logoInicio" />
          </div>
        </div>
        {/* logo en desktop: a la derecha */}
        <img
          src="/logRed.jpg"
          alt="Logo de UnaHur Anti-Social Net"
          className="img-fluid logoInicio flex-shrink-0 ms-auto d-none d-md-block"
        />
      </div>
    </div>
  );
}

export default Nosotros;
