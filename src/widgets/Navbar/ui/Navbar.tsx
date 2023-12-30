import { classNames } from "@/shared/libs/classNames/classNames";

// import { Text } from "@/shared/ui/Text";
import { HStack } from "@/shared/ui/Stack";
// import { NotificationButton } from "@/features/notificationButton";
import { AvatarDropdown } from "@/features/avatarDropdown";
// import useStore from "@/app/providers/StoreProvider/config/useStore";
import { observer } from "mobx-react-lite";
import cls from "./Navbar.module.scss";
import { Button } from "@/shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { getBookCreate } from "@/shared/consts/router";
import { Input } from "@/shared/ui/Input";

interface NavbarProps {
  className?: string;
}

export const Navbar = observer(({ className }: NavbarProps) => {
  // const { user } = useStore();
  const navigate = useNavigate();

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Input className={cls.searchInput} placeholder="Поиск" />
      <HStack gap="16" className={cls.actions}>
        <Button
          className={cls.createBtn}
          onClick={() => navigate(getBookCreate())}
        >
          {"Добавить книгу"}
        </Button>
        {/* <NotificationButton /> */}
        <AvatarDropdown />
      </HStack>
    </header>
  );
});
