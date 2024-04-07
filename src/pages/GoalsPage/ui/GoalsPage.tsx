import { Page } from "@/widgets/Page";
import cls from "./GoalsPage.module.scss";
import { GoalsList } from "@/features/goals/GoalsList";
import { AddBtnGoals } from "@/features/goals/AddBtnGoals";

const GoalsPage = () => {
  return (
    <Page data-testid="GoalsPage">
      <h1>Мои цели</h1>
      <AddBtnGoals className={cls.createBtn} />
      <GoalsList />
    </Page>
  );
};

export default GoalsPage;
