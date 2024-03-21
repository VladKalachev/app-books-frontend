import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useState } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { useNavigate } from "react-router-dom";
import { getBooksPage } from "@/shared/consts/router";
import { toast } from "react-toastify";

import { GenresService, IGenre, IGenreCreate } from "@/entities/Genre";
import cls from "./GenreAddForm.module.scss";

interface GenreAddFormProps {
  className?: string;
}

export const GenreAddForm = ({ className }: GenreAddFormProps) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<IGenre["title"]>("");

  const handleSubmit = async () => {
    const form: IGenreCreate = {
      title,
    };

    console.log(form);

    const formData = new FormData();
    formData.append("title", form.title);

    try {
      await GenresService.addGenre(formData);
      toast("Жанр успешно добавлен");
      navigate(getBooksPage());
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <VStack gap="16" className={classNames(cls.GenreAddForm, {}, [className])}>
      <h1>Добавить новый Жанр</h1>
      <Input
        autofocus
        type="text"
        className={cls.input}
        placeholder={"Введите Жанр"}
        onChange={(value) => setTitle(value)}
        value={title}
      />
      <Button className={cls.loginBtn} onClick={handleSubmit}>
        {"Добавить"}
      </Button>
    </VStack>
  );
};
