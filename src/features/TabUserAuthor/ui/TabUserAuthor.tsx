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
import {
  IPublishing,
  PublishingList,
  PublishingListItem,
  PublishingService,
} from "@/entities/Publishing";
import { TabItem, Tabs } from "@/shared/ui/Tabs";
import { useEffect, useState } from "react";
import { Input } from "@/shared/ui/Input";

import cls from "./TabUserAuthor.module.scss";
import { useDebounce } from "@/shared/hooks/useDebounce/useDebounce";

export const TabUserAuthor = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [publishing, setPublishing] = useState<IPublishing[]>([]);
  const [value, setValueTabs] = useState(0);

  const [searchBooksValue, setValueBooksSearch] = useState("");
  const [searchGenreValue, setValueGenreSearch] = useState("");
  const [searchAuthorValue, setValueAuthorSearch] = useState("");
  const [searchPublishingValue, setValuePublishingSearch] = useState("");

  const debouncedSearchValue = useDebounce(searchBooksValue, 500);
  const debouncedGenreSearchValue = useDebounce(searchGenreValue, 500);

  const debouncedAuthorSearchValue = useDebounce(searchAuthorValue, 500);
  const debouncedPublishingSearchValue = useDebounce(
    searchPublishingValue,
    500
  );

  const getBooks = async (q: string) => {
    try {
      const bookList = await BooksService.fetchUBooks(q ? `?search=${q}` : "");
      setBooks(bookList.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAuthors = async (q: string) => {
    try {
      const authorList = await AuthorsService.fetchAuthors(
        q ? `?search=${q}` : ""
      );
      setAuthors(authorList.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getGenres = async (q: string) => {
    try {
      const genreList = await GenresService.fetchGenres(
        q ? `?search=${q}` : ""
      );
      setGenres(genreList.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getPublishing = async (q: string) => {
    try {
      const publishingList = await PublishingService.fetchPublishing(
        q ? `?search=${q}` : ""
      );
      setPublishing(publishingList.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBooks(debouncedSearchValue);
  }, [debouncedSearchValue]);

  useEffect(() => {
    getGenres(debouncedGenreSearchValue);
  }, [debouncedGenreSearchValue]);

  useEffect(() => {
    getAuthors(debouncedAuthorSearchValue);
  }, [debouncedAuthorSearchValue]);

  useEffect(() => {
    getPublishing(debouncedPublishingSearchValue);
  }, [debouncedPublishingSearchValue]);

  useEffect(() => {
    () => {
      setBooks([]);
      setAuthors([]);
      setGenres([]);
    };
  }, []);

  const onSearch = (value: string) => {
    setValueBooksSearch(value);
  };

  const onGenreSearch = (value: string) => {
    setValueGenreSearch(value);
  };

  const onAuthorSearch = (value: string) => {
    setValueAuthorSearch(value);
  };

  const onPublishingSearch = (value: string) => {
    setValuePublishingSearch(value);
  };

  const typeTabs: TabItem[] = [
    {
      key: 1,
      title: "Все",
      content: (
        <>
          <Input
            className={cls.searchInput}
            value={searchBooksValue}
            onChange={onSearch}
            placeholder="Поиск"
          />
          <BookList
            books={books}
            renderList={(book) => <BookListItem key={book.id} book={book} />}
          />
        </>
      ),
    },
    {
      key: 2,
      title: "Авторы",
      content: (
        <>
          <Input
            className={cls.searchInput}
            value={searchAuthorValue}
            onChange={onAuthorSearch}
            placeholder="Поиск"
          />
          <AuthorList
            authors={authors}
            renderList={(author) => (
              <AuthorListItem key={author.id} author={author} />
            )}
          />
        </>
      ),
    },
    {
      key: 3,
      title: "Жанры",
      content: (
        <>
          <Input
            className={cls.searchInput}
            value={searchGenreValue}
            onChange={onGenreSearch}
            placeholder="Поиск"
          />
          <GenreList
            genres={genres}
            renderList={(genre) => (
              <GenreListItem key={genre.id} genre={genre} />
            )}
          />
        </>
      ),
    },
    {
      key: 4,
      title: "Издательства",
      content: (
        <>
          <Input
            className={cls.searchInput}
            value={searchPublishingValue}
            onChange={onPublishingSearch}
            placeholder="Поиск"
          />
          <PublishingList
            publishing={publishing}
            renderList={(publishing) => (
              <PublishingListItem key={publishing.id} genre={publishing} />
            )}
          />
        </>
      ),
    },
  ];

  const onClickTab = (index: number) => {
    setValueTabs(index);
  };

  return <Tabs value={value} tabs={typeTabs} onTabClick={onClickTab} />;
};
