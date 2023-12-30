import { memo, useMemo, useState } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";

import { VStack } from "@/shared/ui/Stack";
import cls from "./Sidebar.module.scss";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { useSidebarItems } from "../../model/selectors/getSidebarItems";
import ArrowIcon from "@/shared/assets/icons/arrow-bottom.svg?react";
import BookIcon from "@/shared/assets/icons/book-filled.svg?react";
// import { AppLogo } from "@/shared/ui/AppLogo";
import { Icon } from "@/shared/ui/Icon";

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSidebarItems();

  const onToggle = () => {
    console.log(collapsed);
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
      {/* <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} /> */}
      <div className={cls.appLogo}>
        <Icon Svg={BookIcon} />
        {collapsed ? "" : "КНИГАРУМ"}
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
