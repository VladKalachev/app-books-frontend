// import useStore from "@/app/providers/StoreProvider/config/useStore";
import { BooksService, IBook } from "@/entities/Book";
import { BookList } from "@/entities/Book/ui/BookList/BookList";
import { BookListItem } from "@/entities/Book/ui/BookListItem/BookListItem";
import { Text } from "@/shared/ui/Text";

import { Page } from "@/widgets/Page";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import cls from "./HomePage.module.scss";

const HomePage = () => {
  // const { user } = useStore();
  // const navigate = useNavigate();

  const [books, setBooks] = useState<IBook[]>([]);

  const getBooks = async () => {
    try {
      const bookList = await BooksService.fetchUBooks();
      setBooks(bookList.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
    () => {
      setBooks([]);
    };
  }, []);

  return (
    <Page data-testid="HomePage">
      <Text size="l" title="Главная" bold />

      <Text
        title={`Мои книги (сейчас в коллекции ${books.length} книг)`}
        className={cls.textTitle}
        size="s"
      />
      <BookList
        books={books.slice(0, 5)}
        renderList={(book) => <BookListItem book={book} />}
      />

      <Text
        title={`Прочитанное (В этом году прочитано ${
          books.filter((book) => !book.read).length
        } книг) `}
        className={cls.textTitle}
        size="s"
      />
      <BookList
        books={books.slice(0, 5)}
        renderList={(book) => <BookListItem book={book} />}
      />
    </Page>
  );
};

export default observer(HomePage);
