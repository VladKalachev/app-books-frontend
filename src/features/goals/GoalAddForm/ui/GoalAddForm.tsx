import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useEffect, useState } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { useNavigate } from "react-router-dom";
import { getGoalsPage } from "@/shared/consts/router";
import { toast } from "react-toastify";
import { Select } from "@/shared/ui/Select";
import { GoalService, IGoal, IGoalCreate } from "@/entities/Goal";
import { BooksService } from "@/entities/Book";

import cls from "./GoalAddForm.module.scss";

interface GoalAddFormProps {
  className?: string;
}

export const GoalAddForm = ({ className }: GoalAddFormProps) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<IGoal["title"]>("");
  const [books, setBooks] = useState<any[]>([]);
  const [bookId, setBookId] = useState("null");

  const getBooks = async () => {
    try {
      const bookList = await BooksService.fetchUBooks();

      const optionsBook = bookList.data?.map((book) => ({
        value: book.id,
        content: book.title,
      }));

      const data: any = [
        ...optionsBook,
        { value: "null", content: "Не выбран" },
      ];
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleSubmit = async () => {
    const form: IGoalCreate = {
      title,
    };

    console.log(form);

    const formData = new FormData();
    formData.append("title", form.title);

    try {
      await GoalService.addGoal(formData);
      toast("Цель успешно добавлен");
      navigate(getGoalsPage());
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSelectBook = (value: string) => {
    if (value !== "null") {
      const selectValue = books?.find((book) => book.value === Number(value));
      setTitle(selectValue?.content);
    } else {
      setTitle("");
    }
    setBookId(value);
  };

  return (
    <VStack gap="16" className={classNames(cls.GoalAddForm, {}, [className])}>
      <h1>Добавить новую Цель</h1>

      <Input
        autofocus
        type="text"
        className={cls.input}
        placeholder={"Введите Название Книги"}
        onChange={(value) => setTitle(value)}
        value={title}
      />

      <Select
        label={"Введите Название Книги"}
        value={bookId}
        options={books}
        className={cls.selectedBook}
        onChange={(value) => handleSelectBook(value)}
      />

      <Button className={cls.loginBtn} onClick={handleSubmit}>
        {"Добавить"}
      </Button>
    </VStack>
  );
};
