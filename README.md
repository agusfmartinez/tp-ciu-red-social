# UnaHur Anti-Social Net

Red social desarrollada con **React + TypeScript** como trabajo práctico de la materia **Construcción de Interfaces de Usuario** (UNAHUR).

La aplicación permite navegar publicaciones, ver su detalle con comentarios, registrarse, iniciar sesión, comentar y crear publicaciones propias con etiquetas e imágenes.

## 👥 Integrantes

| Nombre | GitHub | Email |
|---|---|---|
| Sebastian Masatti | [@sebanyus](https://github.com/sebanyus) | sebastianmasatti95@gmail.com |
| Ezequiel Piñeyro | [@ezequielpineyro15-sys](https://github.com/ezequielpineyro15-sys) | ezequielpineyro15@gmail.com |
| Agustin Martinez | [@agusfmartinez](https://github.com/agusfmartinez) | agustinfelix.martinez@estudiantes.unahur.edu.ar |

## 🛠️ Tecnologías

- [React 19](https://react.dev/) + TypeScript
- [Vite](https://vite.dev/)
- [React Router 7](https://reactrouter.com/)
- [Bootstrap 5](https://getbootstrap.com/) + [React Bootstrap](https://react-bootstrap.github.io/)
- ESLint

## 🔌 API

Usamos **nuestro propio BackEnd** de la materia Estrategias de Persistencia (Node.js + Express + MongoDB):

- Repositorio: https://gitea.unahur.edu.ar/Estrategia-de-persistencia-C2-2026/trabajo-practico-2-pedidossimulator
- URL local: `http://localhost:4000`

> **Diferencia con la consigna:** en nuestro backend las imágenes por URL se envían dentro del mismo `POST /posts` (campo `images`), en lugar de un `POST /postimages` por cada una. Además se pueden subir archivos de imagen con `POST /posts/:id/images/upload`.

## 🚀 Instalación y ejecución

Requisitos: [Node.js](https://nodejs.org/) 20 o superior y el backend levantado.

```bash
# 1. Clonar el repositorio
git clone https://github.com/agusfmartinez/tp-ciu-red-social.git
cd tp-ciu-red-social

# 2. Instalar dependencias
npm install

# 3. Crear el archivo .env a partir del ejemplo
cp .env.example .env

# 4. Levantar el servidor de desarrollo
npm run dev
```

Luego abrir en el navegador la URL que muestra la consola (por defecto `http://localhost:5173`).

El archivo `.env` define la URL de la API:

```
VITE_API_URL=http://localhost:4000
```

Si no existe, la app usa `http://localhost:4000` por defecto.

Otros scripts disponibles:

| Comando | Descripción |
|---|---|
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la versión de producción |
| `npm run lint` | Revisa el código con ESLint |

## 📄 Páginas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Inicio | Bienvenida y feed de publicaciones recientes |
| `/publicaciones` | Publicaciones | Feed completo con búsqueda, filtro por etiqueta y ordenamiento |
| `/post/:id` | Detalle | Publicación completa, comentarios visibles y formulario para comentar |
| `/login` | Iniciar sesión | Login simulado con nickName y contraseña `123456` |
| `/registro` | Registro | Alta de usuario nuevo |
| `/perfil` | Mi perfil 🔒 | Datos del usuario logueado y sus publicaciones |
| `/usuario/:id` | Perfil | Perfil público de otro usuario (desde el autor de un post) |
| `/nueva-publicacion` | Nueva publicación 🔒 | Formulario para crear un post |
| `/nosotros` | Nosotros | Información del proyecto |
| `/contacto` | Contacto | Formulario de contacto con validación |

🔒 = ruta protegida: sin sesión redirige a `/login`.

## ✨ Funcionalidades

- **Login simulado:** verifica que el usuario exista con `GET /users` y valida la contraseña fija `123456` en el front. La sesión se guarda en un **contexto global** (`useContext`) y en `localStorage`.
- **Registro** con validación de campos y mensajes de error del backend; al registrarse se inicia sesión directamente.
- **Feed** con descripción, imágenes, etiquetas, cantidad de comentarios visibles y botón "Ver más".
- **Detalle** con comentarios visibles y formulario controlado para comentar (`POST /comments`).
- **Perfil** con las publicaciones del usuario consultadas con `GET /posts?userId=...`. Al hacer click en el autor de un post se abre su perfil.
- **Nueva publicación:**
  - Descripción obligatoria (1 a 300 caracteres).
  - Etiquetas con texto libre: sugiere las existentes (`GET /tags`) y permite crear nuevas.
  - Imágenes por URL con vista previa, o archivos subidos desde la compu con miniatura (máximo 10).
- **Navbar según la sesión** (iniciar sesión / registrarse, o perfil y cerrar sesión) y barra inferior en celulares.
- **Notificaciones** (Toast) y alertas de error.
- **Diseño responsive** adaptado a celulares, tablets y escritorio.

## 📁 Estructura del proyecto

```
tp-ciu-red-social/
├── public/                 # Imágenes estáticas (logo, placeholder)
├── src/
│   ├── components/         # Componentes reutilizables (NavBar, PostCard, Footer, Toast)
│   ├── config/             # URL de la API
│   ├── context/            # AuthContext y AuthProvider (usuario logueado)
│   ├── hooks/              # Custom hooks (useAuth, usePosts, toast)
│   ├── lib/                # Cliente HTTP (request) y mappers
│   ├── pages/              # Páginas asociadas a cada ruta
│   ├── services/           # Llamadas a la API (posts, users, comments, tags)
│   ├── types/              # Tipos de los datos que devuelve la API
│   ├── App.tsx             # Rutas
│   └── main.tsx            # Punto de entrada
├── .env.example
└── index.html
```

## 🧠 Decisiones de diseño

- Las páginas no llaman a `fetch` directamente: usan **services** que pasan por una función común `request()`, y **mappers** que traducen los datos del backend (en español) a lo que usan los componentes.
- El botón de **cerrar sesión** está en el navbar (y como ícono en mobile) para que esté disponible desde cualquier página, no solo desde el perfil.
