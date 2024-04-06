import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useState } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { useNavigate } from "react-router-dom";
import { getGoalsPage } from "@/shared/consts/router";
import { toast } from "react-toastify";

import { GoalService, IGoal, IGoalCreate } from "@/entities/Goal";
import cls from "./GoalAddForm.module.scss";

interface GoalAddFormProps {
  className?: string;
}

export const GoalAddForm = ({ className }: GoalAddFormProps) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<IGoal["title"]>("");

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

      <Button className={cls.loginBtn} onClick={handleSubmit}>
        {"Добавить"}
      </Button>
    </VStack>
  );
};
