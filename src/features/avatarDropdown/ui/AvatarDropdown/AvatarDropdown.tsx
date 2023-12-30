import { useCallback } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";

import { getLoginPage, getSettingsPage } from "@/shared/consts/router";
// import SettingIcon from "@/shared/assets/icons/setting.svg?react";
import { Dropdown } from "@/shared/ui/Popups";
// import { Avatar } from "@/shared/ui/Avatar";
import useStore from "@/app/providers/StoreProvider/config/useStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = observer((props: AvatarDropdownProps) => {
  const { className } = props;
  const { user } = useStore();
  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    user?.logout();
    navigate(getLoginPage());
  }, [user]);

  if (!user) {
    return null;
  }

  const items = [
    {
      content: "Настройки",
      href: getSettingsPage(),
      // icon: SettingIcon,
    },
    // {
    //   content: "Профиль",
    //   href: getRouteProfile(authData.id),
    // },
    {
      content: "Выйти",
      onClick: onLogout,
    },
  ];

  return (
    <Dropdown
      direction="bottom left"
      className={classNames("", {}, [className])}
      items={items}
      trigger={<>{user.user.email}</>}
      //   trigger={<Avatar size={40} src={user.avatar} />}
    />
  );
});
