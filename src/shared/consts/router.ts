export enum AppRoutes {
  HOME = "home",
  SETTINGS = "settings",
  BOOKS = "books",
  BOOKS_CREATE = "books_create",
  BOOKS_EDIT = "books_edit",
  GOALS = "goals",
  RATING = "rating",
  STATISTICS = "statistics",
  // FORBIDDEN = 'forbidden',
  // // last
  NOT_FOUND = "not_found",
}

export const getHomePage = () => "/home";
export const getBooksPage = () => "/books";
export const getGoalsPage = () => "/goals";
export const getLandingPage = () => "/";
export const getLoginPage = () => "/login";
export const getRatingPage = () => "/rating";
export const getRegistrationPage = () => "/registration";
export const getSettingsPage = () => "/settings";
export const getStatisticsPage = () => "/statistics";

export const getBookCreate = () => "/books/create";
export const getBookEdit = (id: string) => `/books/${id}/edit`;

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
