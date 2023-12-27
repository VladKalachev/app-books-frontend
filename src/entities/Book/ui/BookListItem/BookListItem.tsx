import { Card } from "@/shared/ui/Card";
import { IBook } from "../..";

interface BookListItemProps {
  book: IBook;
  className?: string;
}

export const BookListItem = (props: BookListItemProps) => {
  const { book, className } = props;
  return (
    <Card className={className}>
      {book.id} {book.title}
      {book.description}
      {book.year}
    </Card>
  );
};
