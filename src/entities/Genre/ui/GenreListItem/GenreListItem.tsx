import { Card } from "@/shared/ui/Card";
import { VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

import { classNames } from "@/shared/libs/classNames/classNames";
import { AppLink } from "@/shared/ui/AppLink";
import { getGenresEdit } from "@/shared/consts/router";
import { IGenre } from "../..";

import cls from "./GenreListItem.module.scss";

interface GenreListItemProps {
  genre: IGenre;
  className?: string;
}

export const GenreListItem = (props: GenreListItemProps) => {
  const { genre, className } = props;
  return (
    <div className={classNames(cls.GenreListItem, {}, [className])}>
      <Card className={cls.card} border="partial" padding="0" variant="light">
        <VStack className={cls.info} gap="4">
          <AppLink to={getGenresEdit(genre.id.toString())}>
            <Text title={genre.title} className={cls.title} />
          </AppLink>
        </VStack>
      </Card>
    </div>
  );
};
