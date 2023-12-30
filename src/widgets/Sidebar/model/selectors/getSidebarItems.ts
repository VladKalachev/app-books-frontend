// import ArticleIcon from "@/shared/assets/icons/user-filled.svg";

import { getHomePage, getBooksPage } from "@/shared/consts/router";

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
      text: "Книги",
      authOnly: true,
    },
  ];

  return sidebarItemsList;
};
