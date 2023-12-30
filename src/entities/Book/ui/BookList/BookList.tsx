import { ReactNode } from "react";
import { IBook } from "../..";
import { HStack } from "@/shared/ui/Stack";
import { classNames } from "@/shared/libs/classNames/classNames";
import cls from "./BookList.module.scss";

interface BookListProps {
  books: IBook[];
  renderList: (book: IBook) => ReactNode;
}

export const BookList = (props: BookListProps) => {
  const { books, renderList } = props;

  if (!books.length) {
    return <>У вас нет добавленных книг</>;
  }

  return (
    <HStack
      wrap="wrap"
      gap="16"
      className={classNames(cls.BookList, {}, [])}
      data-testid="BookList"
    >
      {books.map((item) => renderList(item))}
    </HStack>
  );
};
