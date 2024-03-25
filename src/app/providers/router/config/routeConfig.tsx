import {
  AppRoutes,
  getAuthorsCreate,
  getAuthorsEdit,
  getBookCreate,
  getBookEdit,
  getBooksPage,
  getGenresCreate,
  getGenresEdit,
  getGoalsPage,
  getHomePage,
  getPublishingCreate,
  getRatingPage,
  getSettingsPage,
  getStatisticsPage,
} from "@/shared/consts/router";

import { AppRoutesProps } from "@/shared/types/router";
import { SettingsPage } from "@/pages/SettingsPage";
import { BooksPage } from "@/pages/BooksPage";
import { HomePage } from "@/pages/HomePage";
import { GoalsPage } from "@/pages/GoalsPage";
import { RatingPage } from "@/pages/RatingPage";
import { StatisticsPage } from "@/pages/StatisticsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { AddBookPage } from "@/pages/AddBookPage";
import { BookEditPage } from "@/pages/BookEditPage";
import { AddAuthorPage } from "@/pages/AddAuthorPage";
import { GenreEditPage } from "@/pages/GenreEditPage";
import { AddPublishingPage } from "@/pages/AddPublishingPage";
import { PublishingEditPage } from "@/pages/PublishingEditPage";
import { AddGenrePage } from "@/pages/AddGenrePage";
import { AuthorEditPage } from "@/pages/AuthorEditPage";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.HOME]: {
    path: getHomePage(),
    element: <HomePage />,
    authOnly: true,
  },
  [AppRoutes.BOOKS]: {
    path: getBooksPage(),
    element: <BooksPage />,
    authOnly: true,
  },
  [AppRoutes.BOOKS_CREATE]: {
    path: getBookCreate(),
    element: <AddBookPage />,
    authOnly: true,
  },
  [AppRoutes.AUTHORS_CREATE]: {
    path: getAuthorsCreate(),
    element: <AddAuthorPage />,
    authOnly: true,
  },
  [AppRoutes.AUTHORS_EDIT]: {
    path: getAuthorsEdit(":id"),
    element: <AuthorEditPage />,
    authOnly: true,
  },
  [AppRoutes.GENRES_CREATE]: {
    path: getGenresCreate(),
    element: <AddGenrePage />,
    authOnly: true,
  },
  [AppRoutes.GENRES_EDIT]: {
    path: getGenresEdit(":id"),
    element: <GenreEditPage />,
    authOnly: true,
  },
  [AppRoutes.PUBLISHING_CREATE]: {
    path: getPublishingCreate(),
    element: <AddPublishingPage />,
    authOnly: true,
  },
  [AppRoutes.PUBLISHING_EDIT]: {
    path: getPublishingCreate(),
    element: <PublishingEditPage />,
    authOnly: true,
  },
  [AppRoutes.BOOKS_EDIT]: {
    path: getBookEdit(":id"),
    element: <BookEditPage />,
    authOnly: true,
  },
  [AppRoutes.SETTINGS]: {
    path: getSettingsPage(),
    element: <SettingsPage />,
    authOnly: true,
  },
  [AppRoutes.GOALS]: {
    path: getGoalsPage(),
    element: <GoalsPage />,
    authOnly: true,
  },
  [AppRoutes.RATING]: {
    path: getRatingPage(),
    element: <RatingPage />,
    authOnly: true,
  },
  [AppRoutes.STATISTICS]: {
    path: getStatisticsPage(),
    element: <StatisticsPage />,
    authOnly: true,
  },
  // [AppRoutes.FORBIDDEN]: {
  //     path: getRouteForbidden(),
  //     element: <ForbiddenPage />,
  // },
  [AppRoutes.NOT_FOUND]: {
    path: "*",
    element: <NotFoundPage />,
  },
};
