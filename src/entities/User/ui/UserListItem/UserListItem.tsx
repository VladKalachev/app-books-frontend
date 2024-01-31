import { Card } from "@/shared/ui/Card";

import { Text } from "@/shared/ui/Text";

import { classNames } from "@/shared/libs/classNames/classNames";
import cls from "./UserListItem.module.scss";
import { IUserWithBooks } from "../../model/types/user";

interface UserListItemProps {
  user: IUserWithBooks;
  className?: string;
}

export const UserListItem = (props: UserListItemProps) => {
  const { user, className } = props;
  return (
    <div className={classNames(cls.UserListItem, {}, [className])}>
      <Card className={cls.card} border="partial" padding="0" variant="light">
        <Text text={user.email} />
        <Text
          text={`Книг: ${
            user.Books?.length ? user.Books?.length?.toString() : "-"
          }`}
        />
      </Card>
    </div>
  );
};
