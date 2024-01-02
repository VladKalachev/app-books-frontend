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

interface AddBookFormProps {
  className?: string;
}

export const BookEditForm = (props: AddBookFormProps) => {
  const params = useParams<"id">();
  const { className } = props;

  const navigate = useNavigate();

  const [title, setTitle] = useState<IBook["title"]>("");
  const [description, setDescription] = useState<IBook["description"]>("");
  const [genre, setGenre] = useState<IBook["genre"]>("");
  const [fullName, setFullName] = useState<IBook["fullName"]>("");
  const [image, setImage] = useState<IBook["image"]>("");
  const [year, setYear] = useState<IBook["year"]>(new Date().getFullYear());
  const [numberPages, setNumberPages] = useState<IBook["numberPages"]>(0);
  const [publishing, setPublishing] = useState<IBook["publishing"]>("");
  const [notes, setNotes] = useState<IBook["notes"]>("");
  const [read, setRead] = useState<IBook["read"]>(false);
  const [buy, setBuy] = useState<IBook["buy"]>(false);

  const [loading, setLoading] = useState(false);

  const getBookById = async (id: string) => {
    setLoading(true);
    try {
      const book = await BooksService.getBookById(id);
      console.log(book);
      const formData = book.data;

      setTitle(formData.title);
      setDescription(formData.description);
      setGenre(formData.genre);
      setFullName(formData.fullName);
      setImage(formData.image);
      setYear(formData.year);
      setPublishing(formData.publishing);
      setNumberPages(formData.numberPages);
      setNotes(formData.notes);
      setRead(formData.read);
      setBuy(formData.buy);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
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
      genre,
      year,
      numberPages,
      notes,
      read,
      buy,
    };

    console.log(form);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("fullName", form.fullName);
    formData.append("publishing", form.publishing as string);
    formData.append("genre", form.genre as string);
    formData.append("year", JSON.stringify(form.year));
    formData.append("numberPages", JSON.stringify(form.numberPages));
    formData.append("notes", form.notes as string);
    formData.append("read", JSON.stringify(form.read));
    formData.append("buy", JSON.stringify(form.buy));
    formData.append("image", image as any);

    try {
      await BooksService.updateBook(params.id as string, formData as any);
      navigate(getBooksPage());
    } catch (error: any) {
      console.log(error);
    }
  };

  console.log("image", image);

  const onDeleteById = async (id: string) => {
    try {
      await BooksService.deleteBookById(id);
      toast("Книга успешно удалена");
      navigate(getBooksPage());
    } catch (error: any) {
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
      <Input
        type="text"
        className={cls.input}
        label={"Введите жанр книги"}
        placeholder={"Введите значение"}
        onChange={(value) => setGenre(value)}
        value={genre}
      />
      <Input
        type="text"
        className={cls.input}
        placeholder={"Введите ФИО Автора"}
        onChange={(value) => setFullName(value)}
        value={fullName}
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
