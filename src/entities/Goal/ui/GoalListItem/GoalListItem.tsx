import { Card } from "@/shared/ui/Card";
import { VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

import { classNames } from "@/shared/libs/classNames/classNames";
import { AppLink } from "@/shared/ui/AppLink";
import { getGoalEditPage } from "@/shared/consts/router";
import { IGoal } from "../..";

import cls from "./GoalListItem.module.scss";

interface GoalListItemProps {
  goal: IGoal;
  className?: string;
}

export const GoalListItem = (props: GoalListItemProps) => {
  const { goal, className } = props;
  return (
    <div className={classNames(cls.GoalListItem, {}, [className])}>
      <Card className={cls.card} border="partial" padding="0" variant="light">
        <VStack className={cls.info} gap="4">
          <AppLink to={getGoalEditPage(goal.id.toString())}>
            <Text title={goal.title} className={cls.title} />
          </AppLink>
        </VStack>
      </Card>
    </div>
  );
};
