import { BooksService, IBook } from "@/entities/Book";
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
      BooksPage
      <div>sidebar</div>
      <div>header</div>
      <div>
        body
        {books?.map((book) => (
          <div key={book?.id}>{book.title}</div>
        ))}
      </div>
      <div>footer</div>
    </Page>
  );
};

export default BooksPage;
