import { BooksService, IBook, IBookCreate } from "@/entities/Book";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useState } from "react";
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

interface AddBookFormProps {
  className?: string;
}

export const AddBookForm = (props: AddBookFormProps) => {
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

  const handleSubmit = async () => {
    const form: IBookCreate = {
      title,
      description,
      fullName,
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
   * - genre Жанр [X] => select
   * - fullName ФИО Автора input [X] => select
   * - image Картинка uploder [X]
   * - year [] Год когда была написана numberInput [X]
   * - numberPages Количество страниц numberInput [X]
   * - publishing Издательство input [X] => select
   * - notes Мои заметки по книги textarea [X]
   * - read Прочитано/не прочитано toggle [X]
   * - buy Купил/Не купил toggle [X]
   */

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
        label={"Введите ФИО Автора"}
        placeholder={"Введите значение"}
        onChange={(value) => setFullName(value)}
        value={fullName}
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
        {"Добавить"}
      </Button>
    </VStack>
  );
};
