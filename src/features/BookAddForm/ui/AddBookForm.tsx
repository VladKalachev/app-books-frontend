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

  const handleSubmit = async () => {
    const formData: IBookCreate = {
      title,
      description,
      fullName,
      image,
      publishing,
      genre,
      year,
      numberPages,
      notes: "text",
      read: true,
      buy: true,
    };

    console.log(formData);

    try {
      await BooksService.addBook(formData);
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
   * - image Картинка uploder [ ]
   * - year [] Год когда была написана numberInput [X]
   * - numberPages Количество страниц numberInput [X]
   * - publishing Издательство input [X] => select
   * - notes Мои заметки по книги textarea [X]
   * - read Прочитано/не прочитано toggle []
   * - buy Купил/Не купил toggle []
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
      <Input
        type="text"
        className={cls.input}
        placeholder={"Загрузите картинку"}
        onChange={(value) => setImage(value)}
        value={image}
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

      <Button className={cls.loginBtn} onClick={handleSubmit}>
        {"Добавить"}
      </Button>
    </VStack>
  );
};
