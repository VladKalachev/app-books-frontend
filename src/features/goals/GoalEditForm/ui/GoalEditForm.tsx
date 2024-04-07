import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useEffect, useState } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { getGoalsPage } from "@/shared/consts/router";
import { toast } from "react-toastify";

import { GenresService, IGenre, IGenreCreate } from "@/entities/Genre";

import cls from "./GenreEditForm.module.scss";
import { GoalService } from "@/entities/Goal";

interface GenreEditFormProps {
  className?: string;
}

export const GoalEditForm = (props: GenreEditFormProps) => {
  const params = useParams<"id">();
  const { className } = props;

  const navigate = useNavigate();

  const [title, setTitle] = useState<IGenre["title"]>("");

  const [loading, setLoading] = useState(false);

  const getGoalById = async (id: string) => {
    setLoading(true);
    try {
      const goal = await GoalService.getGoalById(id);

      const formData = goal.data;

      setTitle(formData.title);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      if (params?.id) {
        getGoalById(params?.id);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  const handleSubmit = async () => {
    const form: IGenreCreate = {
      title,
    };

    console.log(form);

    const formData = new FormData();
    formData.append("title", form.title);

    console.log(formData);

    try {
      await GoalService.updateGoal(params.id as string, formData as any);
      navigate(getGoalsPage());
    } catch (error: any) {
      console.log(error);
    }
  };

  const onDeleteById = async (id: string) => {
    try {
      await GenresService.deleteGenreById(id);
      toast("Цель успешно удален");
      navigate(getGoalsPage());
    } catch (error: any) {
      console.log(error);
    }
  };

  if (loading) {
    return "Loading...";
  }

  return (
    <VStack gap="16" className={classNames(cls.GenreForm, {}, [className])}>
      <h1>Редактировать Цель</h1>
      <Input
        autofocus
        type="text"
        className={cls.input}
        placeholder={"Введите Жанр"}
        onChange={(value) => setTitle(value)}
        value={title}
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
