import { BooksService, IBook } from "@/entities/Book";
import { BookList, BookListItem } from "@/entities/Book";

import { Page } from "@/widgets/Page";
import { useEffect, useState } from "react";

const BooksPage = () => {
  const [books, setBooks] = useState<IBook[]>([]);

  const getBooks = async () => {
    try {
      const bookList = await BooksService.fetchUBooks();
      setBooks(bookList.data);
    } catch (error: any) {
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
    <Page data-testid="BooksPage">
      <h1>Мои книги</h1>
      <div>
        <BookList
          books={books}
          renderList={(book) => <BookListItem key={book.id} book={book} />}
        />
      </div>
    </Page>
  );
};

export default BooksPage;
