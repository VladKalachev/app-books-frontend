import { memo, useMemo, useState } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";

import { VStack } from "@/shared/ui/Stack";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { useSidebarItems } from "../../model/selectors/getSidebarItems";
import ArrowIcon from "@/shared/assets/icons/arrow-bottom.svg?react";
import BookIcon from "@/shared/assets/icons/book-filled.svg?react";
import { Icon } from "@/shared/ui/Icon";

import cls from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSidebarItems();

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem item={item} collapsed={collapsed} key={item.path} />
      )),
    [collapsed, sidebarItemsList]
  );

  return (
    <aside
      data-testid="sidebar"
      className={classNames(
        cls.SidebarRedesigned,
        { [cls.collapsedRedesigned]: collapsed },
        [className]
      )}
    >
      <div className={cls.appLogo}>
        <Icon Svg={BookIcon} />
        <span>{collapsed ? "" : "КНИГАРУМ"}</span>
      </div>

      <VStack role="navigation" gap="8" className={cls.items}>
        {itemsList}
      </VStack>
      <Icon
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        Svg={ArrowIcon}
        clickable
      />
    </aside>
  );
});
