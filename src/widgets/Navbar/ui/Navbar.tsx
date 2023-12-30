import { classNames } from "@/shared/libs/classNames/classNames";

import { Text } from "@/shared/ui/Text";
import { AppLink } from "@/shared/ui/AppLink";
import { HStack } from "@/shared/ui/Stack";
// import { NotificationButton } from "@/features/notificationButton";
import { AvatarDropdown } from "@/features/avatarDropdown";

// import { Button } from "@/shared/ui/Button";
// import useStore from "@/app/providers/StoreProvider/config/useStore";
import { observer } from "mobx-react-lite";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = observer(({ className }: NavbarProps) => {
  // const { user } = useStore();

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Text className={cls.appName} title={"Поиск"} />
      <AppLink
        to={"/books/create"}
        //   theme={AppLinkTheme.SECONDARY}
        className={cls.createBtn}
      >
        {"Добавить книгу"}
      </AppLink>
      <HStack gap="16" className={cls.actions}>
        {/* <NotificationButton /> */}
        <AvatarDropdown />
      </HStack>
    </header>
  );
});
