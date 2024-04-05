export enum AppRoutes {
  HOME = "home",
  SETTINGS = "settings",
  BOOKS = "books",
  BOOKS_CREATE = "books_create",
  BOOKS_EDIT = "books_edit",
  // AUTHORS = "authors",
  AUTHORS_CREATE = "authors_create",
  AUTHORS_EDIT = "authors_edit",
  PUBLISHING_CREATE = "publishing_create",
  PUBLISHING_EDIT = "publishing_edit",
  GENRES_CREATE = "genres_create",
  GENRES_EDIT = "genres_edit",
  GOALS = "goals",
  RATING = "rating",
  STATISTICS = "statistics",

  // FORBIDDEN = 'forbidden',
  // // last
  NOT_FOUND = "not_found",
}

export const getHomePage = () => "/home";

export const getGoalsPage = () => "/goals";
export const getGoalsCreatePage = () => "/goals/create";
export const getGoalEditPage = (id: string) => `/goals/${id}/edit`;

export const getLandingPage = () => "/";
export const getLoginPage = () => "/login";
export const getRatingPage = () => "/rating";
export const getRegistrationPage = () => "/registration";
export const getSettingsPage = () => "/settings";
export const getStatisticsPage = () => "/statistics";

export const getBooksPage = () => "/books";
export const getBookCreate = () => "/books/create";
export const getBookEdit = (id: string) => `/books/${id}/edit`;

// export const getAuthorsPage = () => "/authors";
export const getAuthorsCreate = () => "/books/authorCreate";
export const getAuthorsEdit = (id: string) => `/books/authors/${id}/`;

export const getGenresCreate = () => "/books/genresCreate";
export const getGenresEdit = (id: string) => `/books/genres/${id}/`;

export const getPublishingCreate = () => "/books/publishingCreate";
export const getPublishingEdit = (id: string) => `/books/publishing/${id}/`;

// export const getRouteAbout = () => '/about';
// export const getRouteProfile = (id: string) => `/profile/${id}`;
// export const getRouteArticles = () => '/articles';
// export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
// export const getRouteArticleCreate = () => '/articles/new';
// export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
// export const getRouteAdmin = () => '/admin';
// export const getRouteForbidden = () => '/forbidden';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getBooksPage()]: AppRoutes.BOOKS,
  [getBookCreate()]: AppRoutes.BOOKS_CREATE,
  [getBookEdit(":id")]: AppRoutes.BOOKS_EDIT,
  // [getAuthorsPage()]: AppRoutes.AUTHORS,
  [getAuthorsCreate()]: AppRoutes.AUTHORS_CREATE,
  [getGenresCreate()]: AppRoutes.GENRES_CREATE,
  // [getAuthorsEdit(":id")]: AppRoutes.AUTHORS_EDIT,
  [getSettingsPage()]: AppRoutes.SETTINGS,
  [getGoalsPage()]: AppRoutes.GOALS,
  [getRatingPage()]: AppRoutes.RATING,
  [getHomePage()]: AppRoutes.HOME,
  [getStatisticsPage()]: AppRoutes.SETTINGS,

  // [getRouteProfile(':id')]: AppRoutes.PROFILE,
  // [getRouteArticles()]: AppRoutes.ARTICLES,
  // [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
  // [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
  // [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
  // [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
  // [getRouteForbidden()]: AppRoutes.FORBIDDEN,
};
