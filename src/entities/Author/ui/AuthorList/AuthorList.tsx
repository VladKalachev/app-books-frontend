import { ReactNode } from "react";
import { HStack } from "@/shared/ui/Stack";
import { classNames } from "@/shared/libs/classNames/classNames";
import { IAuthor } from "../../model/types/author";
import cls from "./AuthorList.module.scss";

interface AuthorListProps {
  authors: IAuthor[];
  renderList: (book: IAuthor) => ReactNode;
}

export const AuthorList = (props: AuthorListProps) => {
  const { authors, renderList } = props;

  if (!authors.length) {
    return <>Нет данных</>;
  }

  return (
    <HStack
      wrap="wrap"
      gap="16"
      className={classNames(cls.BookList, {}, [])}
      data-testid="BookList"
    >
      {authors.map((item) => renderList(item))}
    </HStack>
  );
};
