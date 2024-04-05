import { getGoalsCreatePage } from "@/shared/consts/router";
import { Button } from "@/shared/ui/Button";
import { useNavigate } from "react-router-dom";

interface IAddBtnGoals {
  className?: string;
}

export const AddBtnGoals = ({ className }: IAddBtnGoals) => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className={className}
        onClick={() => navigate(getGoalsCreatePage())}
      >
        {"Добавить цель"}
      </Button>
    </>
  );
};
