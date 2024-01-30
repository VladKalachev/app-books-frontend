import { BooksService, IBook } from "@/entities/Book";
import { BookList, BookListItem } from "@/entities/Book";

import { TabItem, Tabs } from "@/shared/ui/Tabs";

import { Page } from "@/widgets/Page";
import { useEffect, useState } from "react";

const BooksPage = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [value, setValueTabs] = useState(0);

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
      content: <>Authors</>,
    },
  ];

  const onClickTab = (index: number) => {
    setValueTabs(index);
  };

  return (
    <Page data-testid="BooksPage">
      <h1>Мои книги</h1>
      <div>
        <Tabs value={value} tabs={typeTabs} onTabClick={onClickTab} />
      </div>
    </Page>
  );
};

export default BooksPage;
