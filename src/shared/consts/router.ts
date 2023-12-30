export enum AppRoutes {
  HOME = "home",
  SETTINGS = "settings",
  BOOKS = "books",
  GOALS = "goals",
  LANDING = "",
  LOGIN = "login",
  RATING = "rating",
  REGISTRATION = "registration",
  STATISTICS = "statistics",
  // FORBIDDEN = 'forbidden',
  // // last
  // NOT_FOUND = 'not_found',
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
  [getSettingsPage()]: AppRoutes.SETTINGS,
  [getGoalsPage()]: AppRoutes.GOALS,
  [getLandingPage()]: AppRoutes.LANDING,
  [getLoginPage()]: AppRoutes.LOGIN,
  [getRatingPage()]: AppRoutes.RATING,
  [getRegistrationPage()]: AppRoutes.REGISTRATION,
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
