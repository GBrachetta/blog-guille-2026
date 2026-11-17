import type { UIStrings } from "../types";

export default {
  nav: {
    home: "Home",
    posts: "Posts",
    tags: "Tags",
    about: "About",
    archives: "Archives",
    search: "Search",
  },
  post: {
    publishedAt: "Publicado el",
    updatedAt: "Actualizado",
    sharePostIntro: "Compartir este artículo:",
    sharePostOn: "Compartir en {{platform}}",
    sharePostViaEmail: "Compartir por correo electrónico",
    tagLabel: "Etiquetas",
    backToTop: "Volver arriba",
    tableOfContents: "Índice",
    goBack: "Volver",
    editPage: "Editar página",
    previousPost: "Artículo anterior",
    nextPost: "Siguiente artículo",
  },
  pagination: {
    prev: "Anterior",
    next: "Siguiente",
    page: "Página",
  },
  home: {
    socialLinks: "Redes sociales",
    featured: "Destacados",
    recentPosts: "Artículos recientes",
    allPosts: "Todos los artículos",
    siteDescription:
      "Apuntes sobre tecnología, Home Assistant y música barroca.",
  },
  footer: {
    copyright: "Copyright",
    allRightsReserved: "Todos los derechos reservados.",
  },
  pages: {
    tagTitle: "Etiqueta",
    tagDesc: "Todos los artículos con la etiqueta",

    tagsTitle: "Etiquetas",
    tagsDesc: "Todas las etiquetas utilizadas en los artículos.",

    postsTitle: "Artículos",
    postsDesc: "Todos los artículos publicados.",

    archivesTitle: "Archivo",
    archivesDesc: "Todos los artículos archivados.",

    searchTitle: "Buscar",
    searchDesc: "Buscar cualquier artículo...",
  },
  a11y: {
    skipToContent: "Saltar al contenido principal",
    skipTableOfContents: "Saltar índice",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    toggleTheme: "Cambiar tema",
    searchPlaceholder: "Buscar artículos...",
    noResults: "No se encontraron resultados",
    goToPreviousPage: "Ir a la página anterior",
    goToNextPage: "Ir a la página siguiente",
  },
  notFound: {
    title: "404 No encontrado",
    message: "Página no encontrada",
    goHome: "Volver al inicio",
  },
} satisfies UIStrings;
