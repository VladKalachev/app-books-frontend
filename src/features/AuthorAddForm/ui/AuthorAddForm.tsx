import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useState } from "react";
import cls from "./AuthorAddForm.module.scss";
import { classNames } from "@/shared/libs/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { useNavigate } from "react-router-dom";
import { getBooksPage } from "@/shared/consts/router";

import { toast } from "react-toastify";
import { AuthorsService, IAuthor, IAuthorCreate } from "@/entities/Author";

interface AuthorAddFormProps {
  className?: string;
}

export const AuthorAddForm = ({ className }: AuthorAddFormProps) => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState<IAuthor["fullName"]>("");

  const handleSubmit = async () => {
    const form: IAuthorCreate = {
      fullName,
    };
    try {
      await AuthorsService.addAuthor(form);
      toast("Автор успешно добавлен");
      navigate(getBooksPage());
    } catch (error: any) {
      console.log(error);
    }
  };
  
  /**
   * Добавить required для компонентов с *
   */

  return (
    <VStack gap="16" className={classNames(cls.AuthorAddForm, {}, [className])}>
      <h1>Добавить нового автора</h1>
      <Input
        autofocus
        type="text"
        className={cls.input}
        placeholder={"Введите ФИО"}
        onChange={(value) => setFullName(value)}
        value={fullName}
      />
      <Button className={cls.loginBtn} onClick={handleSubmit}>
        {"Добавить"}
      </Button>
    </VStack>
  );
};
