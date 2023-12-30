import { BooksService, IBook, IBookCreate } from "@/entities/Book";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useEffect, useState } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { getBooksPage } from "@/shared/consts/router";

import cls from "./BookEditForm.module.scss";

interface AddBookFormProps {
  className?: string;
}

export const BookEditForm = (props: AddBookFormProps) => {
  const params = useParams<"id">();
  const { className } = props;

  const navigate = useNavigate();

  const [title, setTitle] = useState<IBook["title"]>("");
  const [description, setDescription] = useState<IBook["description"]>("");
  const [fullName, setFullName] = useState<IBook["fullName"]>("");
  const [image, setImage] = useState<IBook["image"]>("");

  const [loading, setLoading] = useState(false);

  const getBookById = async (id: string) => {
    setLoading(true);
    try {
      const book = await BooksService.getBookById(id);
      console.log(book);
      const formData = book.data;

      setTitle(formData.title);
      setDescription(formData.description);
      setFullName(formData.fullName);
      setImage(formData.image);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("params", params.id);
    try {
      if (params?.id) {
        getBookById(params?.id);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

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
      await BooksService.updateBook(params.id as string, formData);
      navigate(getBooksPage());
    } catch (error: any) {
      console.log(error);
    }
  };

  const onDeleteById = async (id: string) => {
    try {
      await BooksService.deleteBookById(id);
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
