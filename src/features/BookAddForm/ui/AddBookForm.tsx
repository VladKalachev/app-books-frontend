import { BooksService, IBook, IBookCreate } from "@/entities/Book";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useEffect, useState } from "react";
import cls from "./AddBookForm.module.scss";
import { classNames } from "@/shared/libs/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { useNavigate } from "react-router-dom";
import { getBooksPage } from "@/shared/consts/router";
import { Textarea } from "@/shared/ui/Textarea";
import { InputNumber } from "@/shared/ui/InputNumber";
import { toast } from "react-toastify";
import { Switch } from "@/shared/ui/Switch";
import { ImageLoader } from "@/shared/ui/ImageLoader";

import { AuthorsService } from "@/entities/Author";
import { Select } from "@/shared/ui/Select";
import { GenresService } from "@/entities/Genre";
import { PublishingService } from "@/entities/Publishing";

interface AddBookFormProps {
  className?: string;
}

export const AddBookForm = (props: AddBookFormProps) => {
  const { className } = props;

  const navigate = useNavigate();

  const [title, setTitle] = useState<IBook["title"]>("");
  const [description, setDescription] = useState<IBook["description"]>("");

  const [authorId, setAuthorId] = useState<IBook["authorId"]>("null");
  const [genreId, setGenreId] = useState<IBook["genreId"]>("null");
  const [publishingId, setPublishingId] =
    useState<IBook["publishingId"]>("null");

  const [image, setImage] = useState<IBook["image"]>("");
  const [year, setYear] = useState<IBook["year"]>(new Date().getFullYear());
  const [numberPages, setNumberPages] = useState<IBook["numberPages"]>(0);

  const [notes, setNotes] = useState<IBook["notes"]>("");
  const [read, setRead] = useState<IBook["read"]>(false);
  const [buy, setBuy] = useState<IBook["buy"]>(false);

  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [publishing, setPublishing] = useState([]);

  const [loading, setLoading] = useState(false);

  const getAuthors = async () => {
    setLoading(true);
    try {
      const authorList = await AuthorsService.fetchAuthors();
      const optionsAuthor = authorList.data?.map((author) => ({
        value: author.id,
        content: author.fullName,
      }));

      const data: any = [
        ...optionsAuthor,
        { value: "null", content: "Не выбран" },
      ];
      setAuthors(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getGenres = async () => {
    setLoading(true);
    try {
      const genreList = await GenresService.fetchGenres();
      const optionsGenre = genreList.data?.map((genre) => ({
        value: genre.id,
        content: genre.title,
      }));

      const data: any = [
        ...optionsGenre,
        { value: "null", content: "Не выбран" },
      ];
      setGenres(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getPublishing = async () => {
    setLoading(true);
    try {
      const publishingList = await PublishingService.fetchPublishing();
      const optionsPublishing = publishingList.data?.map((publishing) => ({
        value: publishing.id,
        content: publishing.title,
      }));

      const data: any = [
        ...optionsPublishing,
        { value: "null", content: "Не выбран" },
      ];
      setPublishing(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthors();
    getGenres();
    getPublishing();
  }, []);

  const handleSubmit = async () => {
    const form: IBookCreate = {
      title,
      description,
      year,
      numberPages,
      notes,
      read,
      buy,
      authorId,
      genreId,
      publishingId,
    };

    console.log(form);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);

    if (authorId) {
      const fullName: any = authors.find(
        (author: any) => author.value === Number(authorId)
      );

      formData.append("fullName", fullName?.content);
      formData.append("AuthorId", authorId);
    }

    if (genreId) {
      const title: any = genres.find(
        (genre: any) => genre.value === Number(genreId)
      );

      formData.append("genre", title?.content);
      formData.append("GenreId", genreId);
    }

    if (publishingId) {
      const title: any = publishing.find(
        (genre: any) => genre.value === Number(publishingId)
      );

      formData.append("publishing", title?.content);
      formData.append("PublishingId", genreId);
    }

    formData.append("year", JSON.stringify(form.year));
    formData.append("numberPages", JSON.stringify(form.numberPages));
    formData.append("notes", form.notes as string);
    formData.append("read", JSON.stringify(form.read));
    formData.append("buy", JSON.stringify(form.buy));
    formData.append("image", image as any);

    try {
      await BooksService.addBook(formData);
      toast("Книга успешно добавлена в вашу коллекцию");
      navigate(getBooksPage());
    } catch (error: any) {
      console.log(error);
    }
  };
  /**
   * Добавить required для компонентов с *
   */

  /**
   * - title Название книги input [X]
   * - description Описание книги textarea [X]
   * - genre Жанр [X] => select [X]
   * - fullName ФИО Автора input [X] => select [X]
   * - image Картинка uploder [X]
   * - year [] Год когда была написана numberInput [X]
   * - numberPages Количество страниц numberInput [X]
   * - publishing Издательство input [X] => select [X]
   * - notes Мои заметки по книги textarea [X]
   * - read Прочитано/не прочитано toggle [X]
   * - buy Купил/Не купил toggle [X]
   */

  if (loading) {
    return "Loading...";
  }

  return (
    <VStack gap="16" className={classNames(cls.LoginForm, {}, [className])}>
      <h1>Добавить новую книгу</h1>
      <Input
        autofocus
        type="text"
        className={cls.input}
        placeholder={"Введите Название книги"}
        onChange={(value) => setTitle(value)}
        value={title}
      />
      <Textarea
        className={cls.input}
        value={description}
        placeholder={"Введите Описание книги"}
        onChange={(value) => setDescription(value)}
      />

      <Select
        label={"Введите жанр книги"}
        value={genreId}
        options={genres}
        onChange={(value) => setGenreId(value)}
      />

      <Select
        label={"Введите ФИО Автора"}
        value={authorId}
        options={authors}
        onChange={(value) => setAuthorId(value)}
      />
      <ImageLoader
        label={"Загрузите картинку"}
        value={image}
        onChange={(value) => setImage(value)}
      />
      <InputNumber
        type="number"
        className={cls.input}
        label={"Год издания книги"}
        placeholder={"Введите значение"}
        onChange={(value) => setYear(value)}
        value={year}
      />
      <InputNumber
        type="number"
        className={cls.input}
        label={"Количество страниц (i)"}
        placeholder={"Введите значение"}
        onChange={(value) => setNumberPages(value)}
        value={numberPages}
      />

      <Select
        label={"Введите Издательство"}
        value={publishingId}
        options={publishing}
        onChange={(value) => setPublishingId(value)}
      />

      <Textarea
        className={cls.input}
        value={notes}
        placeholder={"Мои заметки"}
        onChange={(value) => setNotes(value)}
      />
      <Switch
        label={"Прочитано"}
        checked={read}
        onChange={(value) => setRead(value)}
      />
      <Switch
        label={"Купил"}
        checked={buy}
        onChange={(value) => setBuy(value)}
      />

      <Button className={cls.loginBtn} onClick={handleSubmit}>
        {"Добавить"}
      </Button>
    </VStack>
  );
};
