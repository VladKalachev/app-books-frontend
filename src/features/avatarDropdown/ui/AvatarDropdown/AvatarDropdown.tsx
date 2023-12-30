import { useCallback } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";

import { getLoginPage, getSettingsPage } from "@/shared/consts/router";
import UserIcon from "@/shared/assets/icons/user-filled.svg?react";
import { Dropdown } from "@/shared/ui/Popups";
// import { Avatar } from "@/shared/ui/Avatar";
import useStore from "@/app/providers/StoreProvider/config/useStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Icon } from "@/shared/ui/Icon";
import cls from "./AvatarDropdown.module.scss";

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
      trigger={
        <div className={cls.avatar}>
          <Icon Svg={UserIcon} />
          {user.user.email}
        </div>
      }
      //   trigger={<Avatar size={40} src={user.avatar} />}
    />
  );
});
