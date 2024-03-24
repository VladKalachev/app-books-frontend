import {
  AuthorList,
  AuthorListItem,
  AuthorsService,
  IAuthor,
} from "@/entities/Author";
import { BookList, BookListItem, BooksService, IBook } from "@/entities/Book";
import {
  GenreList,
  GenreListItem,
  GenresService,
  IGenre,
} from "@/entities/Genre";
import { TabItem, Tabs } from "@/shared/ui/Tabs";
import { useEffect, useState } from "react";

export const TabUserAuthor = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
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
      const authorList = await AuthorsService.fetchAuthors();
      setAuthors(authorList.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenres = async () => {
    try {
      const genreList = await GenresService.fetchGenres();
      setGenres(genreList.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
    getAuthors();
    getGenres();
    () => {
      setBooks([]);
      setAuthors([]);
      setGenres([]);
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
    {
      key: 3,
      title: "Жанры",
      content: (
        <GenreList
          genres={genres}
          renderList={(genre) => <GenreListItem key={genre.id} genre={genre} />}
        />
      ),
    },
  ];

  const onClickTab = (index: number) => {
    setValueTabs(index);
  };

  return <Tabs value={value} tabs={typeTabs} onTabClick={onClickTab} />;
};
