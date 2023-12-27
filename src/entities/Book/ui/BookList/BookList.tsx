import { IBook } from "../..";
import { BookListItem } from "../BookListItem/BookListItem";

interface BookListProps {
  books: IBook[];
}

export const BookList = (props: BookListProps) => {
  const { books } = props;
  return (
    <>
      {books.map((item) => (
        <BookListItem book={item} />
      ))}
    </>
  );
};
