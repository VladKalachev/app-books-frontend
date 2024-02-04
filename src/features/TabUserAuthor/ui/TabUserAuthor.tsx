import { AuthorList, AuthorListItem, IAuthor } from "@/entities/Author";
import { BookList, BookListItem, BooksService, IBook } from "@/entities/Book";
import { TabItem, Tabs } from "@/shared/ui/Tabs";
import { useEffect, useState } from "react";

export const TabUserAuthor = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [value, setValueTabs] = useState(0);

  const getBooks = async () => {
    try {
      const bookList = await BooksService.fetchUBooks();
      setBooks(bookList.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAuthors = async () => {
    try {
      const bookList = await BooksService.fetchUBooks();
      setAuthors(bookList.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
    getAuthors();
    () => {
      setBooks([]);
      setAuthors([]);
    };
  }, []);

  const typeTabs: TabItem[] = [
    {
      key: 1,
      title: "Все",
      content: (
        <BookList
          books={books}
          renderList={(book) => <BookListItem key={book.id} book={book} />}
        />
      ),
    },
    {
      key: 2,
      title: "Авторы",
      content: (
        <AuthorList
          authors={authors}
          renderList={(author) => (
            <AuthorListItem key={author.id} author={author} />
          )}
        />
      ),
    },
  ];

  const onClickTab = (index: number) => {
    setValueTabs(index);
  };

  return <Tabs value={value} tabs={typeTabs} onTabClick={onClickTab} />;
};
