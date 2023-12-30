// import ArticleIcon from "@/shared/assets/icons/user-filled.svg";

import {
  getHomePage,
  getBooksPage,
  getGoalsPage,
  getStatisticsPage,
  getRatingPage,
  getSettingsPage,
} from "@/shared/consts/router";

export const useSidebarItems = () => {
  const sidebarItemsList = [
    {
      path: getHomePage(),
      //   Icon: ArticleIcon as any,
      text: "Главная",
      authOnly: true,
    },
    {
      path: getBooksPage(),
      //   Icon: ArticleIcon as any,
      text: "Мои книги",
      authOnly: true,
    },
    {
      path: getGoalsPage(),
      //   Icon: ArticleIcon as any,
      text: "Мои цели",
      authOnly: true,
    },
    {
      path: getStatisticsPage(),
      //   Icon: ArticleIcon as any,
      text: "Моя статистика",
      authOnly: true,
    },
    {
      path: getRatingPage(),
      //   Icon: ArticleIcon as any,
      text: "Рейтинг",
      authOnly: true,
    },
    {
      path: getSettingsPage(),
      //   Icon: ArticleIcon as any,
      text: "Настройки",
      authOnly: true,
    },
  ];

  return sidebarItemsList;
};
