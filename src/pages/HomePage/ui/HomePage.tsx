// import useStore from "@/app/providers/StoreProvider/config/useStore";
import { BooksService, IBook } from "@/entities/Book";
import { BookList } from "@/entities/Book/ui/BookList/BookList";
import { BookListItem } from "@/entities/Book/ui/BookListItem/BookListItem";

import { Page } from "@/widgets/Page";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

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
      <h1>Главная</h1>
      <BookList
        books={books}
        renderList={(book) => <BookListItem book={book} />}
      />
    </Page>
  );
};

export default observer(HomePage);
