import { Button } from "@/shared/ui/Button";
// import { Input } from "@/shared/ui/Input";
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
import { InputNumber } from "@/shared/ui/InputNumber";

interface GoalAddFormProps {
  className?: string;
}

export const GoalAddForm = ({ className }: GoalAddFormProps) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<IGoal["title"]>("");
  const [currentPages, setСurrentPages] = useState<IGoal["currentPages"]>(0);
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
      currentPages,
    };

    console.log(form);

    const formData: any = new FormData();
    formData.append("title", form.title);
    formData.append("currentPages", form.currentPages);
    formData.append("BookId", bookId);

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

      <Select
        label={"Введите Название Книги"}
        value={bookId}
        options={books}
        className={cls.selectedBook}
        onChange={(value) => handleSelectBook(value)}
      />

      <InputNumber
        type="number"
        className={cls.input}
        label={"Количество страниц которое прочитано"}
        placeholder={"Введите значение"}
        onChange={(value) => setСurrentPages(value)}
        value={currentPages}
      />

      <Button className={cls.loginBtn} onClick={handleSubmit}>
        {"Добавить"}
      </Button>
    </VStack>
  );
};
