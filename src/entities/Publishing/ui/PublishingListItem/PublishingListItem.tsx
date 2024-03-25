import { Card } from "@/shared/ui/Card";
import { VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

import { classNames } from "@/shared/libs/classNames/classNames";
import { AppLink } from "@/shared/ui/AppLink";
import { getPublishingEdit } from "@/shared/consts/router";
import { IPublishing } from "../..";

import cls from "./PublishingListItem.module.scss";

interface PublishingListItemProps {
  genre: IPublishing;
  className?: string;
}

export const PublishingListItem = (props: PublishingListItemProps) => {
  const { genre, className } = props;
  return (
    <div className={classNames(cls.PublishingListItem, {}, [className])}>
      <Card className={cls.card} border="partial" padding="0" variant="light">
        <VStack className={cls.info} gap="4">
          <AppLink to={getPublishingEdit(genre.id.toString())}>
            <Text title={genre.title} className={cls.title} />
          </AppLink>
        </VStack>
      </Card>
    </div>
  );
};
