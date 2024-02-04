import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useEffect, useState } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { getBooksPage } from "@/shared/consts/router";
import { toast } from "react-toastify";

import cls from "./AuthorEditForm.module.scss";

import { AuthorsService, IAuthor, IAuthorCreate } from "@/entities/Author";

interface AuthorEditFormProps {
  className?: string;
}

export const AuthorEditForm = (props: AuthorEditFormProps) => {
  const params = useParams<"id">();
  const { className } = props;

  const navigate = useNavigate();

  const [fullName, setFullName] = useState<IAuthor["fullName"]>("");

  const [loading, setLoading] = useState(false);

  const getAuthorById = async (id: string) => {
    setLoading(true);
    try {
      const author = await AuthorsService.getAuthorById(id);

      const formData = author.data;

      setFullName(formData.fullName);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      if (params?.id) {
        getAuthorById(params?.id);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  const handleSubmit = async () => {
    const form: IAuthorCreate = {
      fullName,
    };

    console.log(form);

    const formData = new FormData();
    formData.append("fullName", form.fullName);

    console.log(formData);

    try {
      await AuthorsService.updateAuthor(params.id as string, formData as any);
      navigate(getBooksPage());
    } catch (error: any) {
      console.log(error);
    }
  };

  const onDeleteById = async (id: string) => {
    try {
      await AuthorsService.deleteAuthorById(id);
      toast("Автор успешно удален");
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
      <h1>Редактировать автора</h1>
      <Input
        autofocus
        type="text"
        className={cls.input}
        placeholder={"Введите ФИО"}
        onChange={(value) => setFullName(value)}
        value={fullName}
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
