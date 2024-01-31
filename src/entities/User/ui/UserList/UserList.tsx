import { ReactNode } from "react";
import { HStack } from "@/shared/ui/Stack";
import { classNames } from "@/shared/libs/classNames/classNames";
import { IUserWithBooks } from "../..";
import cls from "./UserList.module.scss";

interface BookListProps {
  users: IUserWithBooks[];
  renderList: (book: IUserWithBooks) => ReactNode;
}

export const UserList = (props: BookListProps) => {
  const { users, renderList } = props;

  if (!users.length) {
    return <>Пользователи отсутствуют</>;
  }

  return (
    <HStack
      wrap="wrap"
      gap="16"
      className={classNames(cls.UserList, {}, [])}
      data-testid="UserList"
    >
      {users
        .sort((a, b) => b?.Books?.length - a?.Books?.length)
        .map((item) => renderList(item))}
    </HStack>
  );
};
