import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useState } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { useNavigate } from "react-router-dom";
import { getBooksPage } from "@/shared/consts/router";
import { toast } from "react-toastify";

import {
  IPublishing,
  IPublishingCreate,
  PublishingService,
} from "@/entities/Publishing";

import cls from "./PublishingAddForm.module.scss";

interface PublishingAddFormProps {
  className?: string;
}

export const PublishingAddForm = ({ className }: PublishingAddFormProps) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<IPublishing["title"]>("");

  const handleSubmit = async () => {
    const form: IPublishingCreate = {
      title,
    };

    try {
      await PublishingService.addPublishing(form);
      toast("Издательство успешно добавлено");
      navigate(getBooksPage());
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <VStack
      gap="16"
      className={classNames(cls.PublishingAddForm, {}, [className])}
    >
      <h1>Добавить новое Издательство</h1>
      <Input
        autofocus
        type="text"
        className={cls.input}
        placeholder={"Введите Издательство"}
        onChange={(value) => setTitle(value)}
        value={title}
      />
      <Button className={cls.loginBtn} onClick={handleSubmit}>
        {"Добавить"}
      </Button>
    </VStack>
  );
};
