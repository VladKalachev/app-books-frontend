import { ReactNode } from "react";
import { IBook } from "../..";

interface BookListProps {
  books: IBook[];
  renderList: (book: IBook) => ReactNode;
}

export const BookList = (props: BookListProps) => {
  const { books, renderList } = props;

  if (!books.length) {
    return <>У вас нет добавленных книг</>;
  }

  return <>{books.map((item) => renderList(item))}</>;
};
