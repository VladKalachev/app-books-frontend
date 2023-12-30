// import { useTranslation } from "react-i18next";
import { memo } from "react";

import { classNames } from "@/shared/libs/classNames/classNames";

import { SidebarItemType } from "../../model/types/sidebar";
import cls from "./SidebarItem.module.scss";
import { AppLink } from "@/shared/ui/AppLink";
// import { Icon } from "@/shared/ui/Icon";

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const isAuth = true;

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink
      to={item.path}
      className={classNames(cls.itemRedesigned, {
        [cls.collapsedRedesigned]: collapsed,
      })}
      activeClassName={cls.active}
    >
      {/* <Icon Svg={item.Icon} /> */}
      <span className={cls.link}>{item.text}</span>
    </AppLink>
  );
});
