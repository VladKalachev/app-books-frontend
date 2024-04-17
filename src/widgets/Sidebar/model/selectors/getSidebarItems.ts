import BookIcon from "@/shared/assets/icons/book-icon.svg?react";
import HomeIcon from "@/shared/assets/icons/home.svg?react";
import ChartIcon from "@/shared/assets/icons/chart.svg?react";
import TaskIcon from "@/shared/assets/icons/task-list.svg?react";
import FieldTimeIcon from "@/shared/assets/icons/field-time.svg?react";

import {
  getHomePage,
  getBooksPage,
  getGoalsPage,
  getStatisticsPage,
  getRatingPage,
} from "@/shared/consts/router";
import { IUser } from "@/entities/User";

interface SidebarItemsProps {
  path: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  text: string;
  authOnly: boolean;
}

export const useSidebarItems = (user: IUser) => {
  const sidebarItemsList: SidebarItemsProps[] = [
    {
      path: getHomePage(),
      Icon: HomeIcon,
      text: "Главная",
      authOnly: true,
    },
    {
      path: getBooksPage(),
      Icon: BookIcon,
      text: "Мои книги",
      authOnly: true,
    },
    {
      path: getGoalsPage(),
      Icon: TaskIcon,
      text: "Мои цели",
      authOnly: true,
    },
    {
      path: getStatisticsPage(),
      Icon: ChartIcon,
      text: "Моя статистика",
      authOnly: true,
    },
    {
      path: getRatingPage(),
      Icon: FieldTimeIcon,
      text: "Рейтинг",
      authOnly: true,
    },
  ];

  return sidebarItemsList.filter((item) =>
    user.isAdmin ? true : item?.text !== "Рейтинг"
  );
};
