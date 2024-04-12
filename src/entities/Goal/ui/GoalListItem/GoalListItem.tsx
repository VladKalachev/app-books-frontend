import { Card } from "@/shared/ui/Card";
import { HStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

import { classNames } from "@/shared/libs/classNames/classNames";
import { AppLink } from "@/shared/ui/AppLink";
import { getGoalEditPage } from "@/shared/consts/router";
import { IGoal } from "../..";

import cls from "./GoalListItem.module.scss";
import { Button } from "@/shared/ui/Button";

interface GoalListItemProps {
  goal: IGoal;
  className?: string;
  onClose: () => void;
}

export const GoalListItem = (props: GoalListItemProps) => {
  const { goal, className, onClose } = props;
  const leftNumber = goal.numberPages - goal.currentPages;
  return (
    <div className={classNames(cls.GoalListItem, {}, [className])}>
      <Card className={cls.card} border="partial" padding="0" variant="light">
        <HStack className={cls.info} gap="4">
          <AppLink to={getGoalEditPage(goal.id.toString())}>
            <Text
              title={goal.title}
              className={classNames(cls.title, {
                [cls.completed]: goal.completed,
              })}
            />
          </AppLink>

          <Button onClick={onClose}>
            {goal.completed ? "Прочитано" : "Прочитал"}
          </Button>

          {!goal.completed && leftNumber ? (
            <Text
              size="s"
              className={cls.numbers}
              title={`Осталось прочитать: ${leftNumber} стр`}
            />
          ) : null}
        </HStack>
      </Card>
    </div>
  );
};
