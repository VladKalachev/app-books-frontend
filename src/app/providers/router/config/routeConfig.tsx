import {
  AppRoutes,
  getBooksPage,
  getGoalsPage,
  getHomePage,
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
  // // last
  [AppRoutes.NOT_FOUND]: {
    path: "*",
    element: <NotFoundPage />,
  },
};
