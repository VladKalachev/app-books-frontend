import { ReactNode } from "react";
import { HStack } from "@/shared/ui/Stack";
import { classNames } from "@/shared/libs/classNames/classNames";
import { IGoal } from "../..";

import cls from "./GenreList.module.scss";

interface GoalListProps {
  goals: IGoal[];
  renderList: (goal: IGoal) => ReactNode;
}

export const GoalList = (props: GoalListProps) => {
  const { goals, renderList } = props;

  if (!goals.length) {
    return <>Нет данных</>;
  }

  return (
    <HStack
      wrap="wrap"
      gap="16"
      className={classNames(cls.GoalList, {}, [])}
      data-testid="GoalList"
    >
      {goals.map((item) => renderList(item))}
    </HStack>
  );
};
