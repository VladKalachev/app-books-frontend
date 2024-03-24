import { BooksService, IBook, IBookCreate } from "@/entities/Book";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useEffect, useState } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { getBooksPage } from "@/shared/consts/router";
import { toast } from "react-toastify";

import cls from "./BookEditForm.module.scss";
import { Textarea } from "@/shared/ui/Textarea";
import { InputNumber } from "@/shared/ui/InputNumber";
import { Switch } from "@/shared/ui/Switch";
import { Skeleton } from "@/shared/ui/Skeleton";
import { AppImage } from "@/shared/ui/AppImage";
import { ImageLoader } from "@/shared/ui/ImageLoader";
import { AuthorsService } from "@/entities/Author";
import { Select } from "@/shared/ui/Select";
import { GenresService } from "@/entities/Genre";

interface AddBookFormProps {
  className?: string;
}

export const BookEditForm = (props: AddBookFormProps) => {
  const params = useParams<"id">();
  const { className } = props;

  const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  const [authorId, setAuthorId] = useState<IBook["authorId"]>("null");
  const [genreId, setGenreId] = useState<IBook["genreId"]>("null");

  const [title, setTitle] = useState<IBook["title"]>("");
  const [description, setDescription] = useState<IBook["description"]>("");
  // const [genre, setGenre] = useState<IBook["genre"]>("");
  const [fullName, setFullName] = useState<IBook["fullName"]>("");
  const [image, setImage] = useState<IBook["image"]>("");
  const [year, setYear] = useState<IBook["year"]>(new Date().getFullYear());
  const [numberPages, setNumberPages] = useState<IBook["numberPages"]>(0);
  const [publishing, setPublishing] = useState<IBook["publishing"]>("");
  const [notes, setNotes] = useState<IBook["notes"]>("");
  const [read, setRead] = useState<IBook["read"]>(false);
  const [buy, setBuy] = useState<IBook["buy"]>(false);

  const [loading, setLoading] = useState(false);

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

  const getAuthors = async () => {
    try {
      const authorList = await AuthorsService.fetchAuthors();
      const optionsAuthor: any = authorList.data?.map((author) => ({
        value: author.id,
        content: author.fullName,
      }));

      setAuthors(optionsAuthor);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookById = async (id: string) => {
    setLoading(true);
    try {
      const book = await BooksService.getBookById(id);

      const formData = book.data;

      console.log("formData", formData);

      setTitle(formData.title);
      setDescription(formData.description);
      setFullName(formData.fullName);
      setImage(formData.image);
      setYear(formData.year);
      setPublishing(formData.publishing);
      setNumberPages(formData.numberPages);
      setNotes(formData.notes);
      setRead(formData.read);
      setBuy(formData.buy);
      setAuthorId(formData.AuthorId);
      setGenreId(formData.GenreId);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthors();
    getGenres();
    try {
      if (params?.id) {
        getBookById(params?.id);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  const handleSubmit = async () => {
    const form: IBookCreate = {
      title,
      description,
      fullName,
      image,
      publishing,
      year,
      numberPages,
      notes,
      read,
      buy,
      authorId,
      genreId,
    };

    console.log(form);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);

    if (form.fullName) {
      const fullName: any = authors.find(
        (author: any) => author.value === Number(authorId)
      );

      formData.append("fullName", fullName?.content);
      formData.append("AuthorId", form.authorId as any);
    }

    if (form.genreId) {
      const title: any = genres.find(
        (genre: any) => genre.value === Number(genreId)
      );

      formData.append("genre", title?.content);
      formData.append("GenreId", form.genreId as any);
    }

    formData.append("publishing", form.publishing as string);
    formData.append("year", JSON.stringify(form.year));
    formData.append("numberPages", JSON.stringify(form.numberPages));
    formData.append("notes", form.notes as string);
    formData.append("read", JSON.stringify(form.read));
    formData.append("buy", JSON.stringify(form.buy));
    formData.append("image", image as any);

    console.log(formData);

    try {
      await BooksService.updateBook(params.id as string, formData as any);
      navigate(getBooksPage());
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteById = async (id: string) => {
    try {
      await BooksService.deleteBookById(id);
      toast("Книга успешно удалена");
      navigate(getBooksPage());
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return "Loading...";
  }

  return (
    <VStack gap="16" className={classNames(cls.LoginForm, {}, [className])}>
      <h1>Редактировать книгу </h1>
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
      {/* <Input
        type="text"
        className={cls.input}
        label={"Введите жанр книги"}
        placeholder={"Введите значение"}
        onChange={(value) => setGenre(value)}
        value={genre}
      /> */}
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

      {typeof image === "string" ? (
        <AppImage
          fallback={<Skeleton width="100%" height={200} />}
          alt={image}
          src={`https://localhost:7000/upload/${image}`}
          className={cls.img}
        />
      ) : null}

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
      <Input
        type="text"
        className={cls.input}
        label={"Издательство"}
        placeholder={"Введите значение"}
        onChange={(value) => setPublishing(value)}
        value={publishing}
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
        {"Редактировать"}
      </Button>
      <Button
        className={cls.loginBtn}
        onClick={() => {
          if (params.id) {
            onDeleteById(params.id.toString());
          }
        }}
      >
        {"Удалить"}
      </Button>
    </VStack>
  );
};
