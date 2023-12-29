import { ReactNode } from "react";
import { IBook } from "../..";

interface BookListProps {
  books: IBook[];
  renderList: (book: IBook) => ReactNode;
}

export const BookList = (props: BookListProps) => {
  const { books, renderList } = props;

  return <>{books.map((item) => renderList(item))}</>;
};
