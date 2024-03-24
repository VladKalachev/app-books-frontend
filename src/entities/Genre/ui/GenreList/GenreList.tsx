import { ReactNode } from "react";
import { HStack } from "@/shared/ui/Stack";
import { classNames } from "@/shared/libs/classNames/classNames";
import { IGenre } from "../..";

import cls from "./GenreList.module.scss";

interface GenreListProps {
  genres: IGenre[];
  renderList: (genre: IGenre) => ReactNode;
}

export const GenreList = (props: GenreListProps) => {
  const { genres, renderList } = props;

  if (!genres.length) {
    return <>Нет данных</>;
  }

  return (
    <HStack
      wrap="wrap"
      gap="16"
      className={classNames(cls.GenreList, {}, [])}
      data-testid="BookList"
    >
      {genres.map((item) => renderList(item))}
    </HStack>
  );
};
