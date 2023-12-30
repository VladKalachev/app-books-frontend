import { BooksService, IBook, IBookCreate } from "@/entities/Book";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useState } from "react";
import cls from "./AddBookForm.module.scss";
import { classNames } from "@/shared/libs/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { useNavigate } from "react-router-dom";
import { getBooksPage } from "@/shared/consts/router";

interface AddBookFormProps {
  className?: string;
}

export const AddBookForm = (props: AddBookFormProps) => {
  const { className } = props;

  const navigate = useNavigate();

  const [title, setTitle] = useState<IBook["title"]>("");
  const [description, setDescription] = useState<IBook["description"]>("");
  const [fullName, setFullName] = useState<IBook["fullName"]>("");
  const [image, setImage] = useState<IBook["image"]>("");

  const handleSubmit = async () => {
    const formData: IBookCreate = {
      title,
      description,
      fullName,
      image,
      publishing: false,
      genre: "test",
      year: 2023,
      numberPages: 0,
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
      <Input
        type="text"
        className={cls.input}
        placeholder={"Введите Описание книги"}
        onChange={(value) => setDescription(value)}
        value={description}
      />
      <Input
        type="text"
        className={cls.input}
        placeholder={"Введите ФИО Автора"}
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
      <Button className={cls.loginBtn} onClick={handleSubmit}>
        {"Добавить"}
      </Button>
    </VStack>
  );
};
