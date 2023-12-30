import { Card } from "@/shared/ui/Card";
import { IBook } from "../..";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Skeleton } from "@/shared/ui/Skeleton";
import { AppImage } from "@/shared/ui/AppImage";
import { Text } from "@/shared/ui/Text";

import cls from "./BookListItem.module.scss";
import { classNames } from "@/shared/libs/classNames/classNames";

interface BookListItemProps {
  book: IBook;
  className?: string;
}

export const BookListItem = (props: BookListItemProps) => {
  const { book, className } = props;
  return (
    <Card
      className={classNames(cls.BookListItem, {}, [className])}
      border="partial"
      padding="0"
      variant="light"
    >
      {/* {book.id} {book.title}
      {book.description}
      {book.year}
      {book.fullName} */}
      <AppImage
        fallback={<Skeleton width="100%" height={200} />}
        alt={book.title}
        src={book.image}
        className={cls.img}
      />
      <VStack className={cls.info} gap="4">
        <Text title={book.title} className={cls.title} />
        <VStack gap="4" className={cls.footer} max>
          <HStack gap="4">{book.fullName}</HStack>
        </VStack>
      </VStack>
    </Card>
  );
};
