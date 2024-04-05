import { Page } from "@/widgets/Page";
import cls from "./GoalsPage.module.scss";
import { Button } from "@/shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { getGoalsCreatePage } from "@/shared/consts/router";

const GoalsPage = () => {
  const navigate = useNavigate();

  return (
    <Page data-testid="GoalsPage">
      <h1>Мои цели</h1>
      <Button
        className={cls.createBtn}
        onClick={() => navigate(getGoalsCreatePage())}
      >
        {"Добавить цель"}
      </Button>
      {/* TODO
      Вывести список целей
      */}
    </Page>
  );
};

export default GoalsPage;
