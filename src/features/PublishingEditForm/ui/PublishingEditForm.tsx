import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useEffect, useState } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { getBooksPage } from "@/shared/consts/router";
import { toast } from "react-toastify";

import cls from "./PublishingEditForm.module.scss";
import {
  IPublishing,
  IPublishingCreate,
  PublishingService,
} from "@/entities/Publishing";
import { observer } from "mobx-react-lite";
import useStore from "@/app/providers/StoreProvider/config/useStore";

interface PublishingEditFormProps {
  className?: string;
}

export const PublishingEditForm = observer((props: PublishingEditFormProps) => {
  const params = useParams<"id">();
  const { className } = props;
  const { user } = useStore();
  const navigate = useNavigate();

  const [title, setTitle] = useState<IPublishing["title"]>("");

  const [loading, setLoading] = useState(false);

  const getPublishingById = async (id: string) => {
    setLoading(true);
    try {
      const publishing = await PublishingService.getPublishingById(id);

      const formData = publishing.data;

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
        getPublishingById(params?.id);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  const handleSubmit = async () => {
    const form: IPublishingCreate = {
      title,
    };

    console.log(form);

    const formData = new FormData();
    formData.append("title", form.title);

    console.log(formData);

    try {
      await PublishingService.updatePublishing(
        params.id as string,
        formData as any
      );
      navigate(getBooksPage());
    } catch (error: any) {
      console.log(error);
    }
  };

  const onDeleteById = async (id: string) => {
    try {
      await PublishingService.deletePublishingById(id);
      toast("Издательство успешно удалено");
      navigate(getBooksPage());
    } catch (error: any) {
      console.log(error);
    }
  };

  if (loading) {
    return "Loading...";
  }

  return (
    <VStack
      gap="16"
      className={classNames(cls.PublishingEditForm, {}, [className])}
    >
      <h1>Редактировать Издательства</h1>
      <Input
        autofocus
        type="text"
        className={cls.input}
        placeholder={"Введите Издательство"}
        onChange={(value) => setTitle(value)}
        value={title}
      />

      <Button className={cls.loginBtn} onClick={handleSubmit}>
        {"Редактировать"}
      </Button>
      <Button
        className={cls.loginBtn}
        disabled={!user.user?.isAdmin}
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
});
