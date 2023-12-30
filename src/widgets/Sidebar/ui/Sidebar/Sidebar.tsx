import { memo, useMemo, useState } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";

import { VStack } from "@/shared/ui/Stack";
import cls from "./Sidebar.module.scss";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { useSidebarItems } from "../../model/selectors/getSidebarItems";

// import { AppLogo } from "@/shared/ui/AppLogo";
// import { Icon } from "@/shared/ui/Icon";
// import ArrowIcon from "@/shared/assets/icons/user-filled.svg";

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [
    collapsed,
    // setCollapsed
  ] = useState(false);
  const sidebarItemsList = useSidebarItems();

  //   const onToggle = () => {
  //     console.log(collapsed);
  //     setCollapsed((prev) => !prev);
  //   };

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
      AppLogo
      <VStack role="navigation" gap="8" className={cls.items}>
        {itemsList}
      </VStack>
      {/* <Icon
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        // Svg={ArrowIcon as any}
        Svg={(<>11</>) as any}
        clickable
      /> */}
    </aside>
  );
});
